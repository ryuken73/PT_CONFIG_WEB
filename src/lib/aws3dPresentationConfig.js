const PRESENTATION_CONFIG_TYPE = 'aws3d-presentation-config';
const PRESENTATION_CONFIG_BUNDLE_TYPE = 'aws3d-presentation-config-bundle';
const PRESENTATION_CONFIG_SCHEMA_VERSION = 1;
const MAX_PRESENTATION_CONFIG_BYTES = 2 * 1024 * 1024;
const SUPPORTED_MODES = ['time', 'duration', 'extrema', 'compare'];

export const SESSION_MODE_LABELS = {
  time: '자료 재생',
  duration: '기간 요약',
  extrema: '기록 갱신 재생',
  compare: '날짜 비교',
};

export const MESSAGES = {
  size: '방송 구성 파일은 2MB 이하만 등록할 수 있습니다.',
  format: 'AWS 3D 방송 구성 JSON 형식이 아닙니다.',
  bundle: '전체 백업 bundle은 사용할 수 없습니다. AWS 3D 장면 메뉴에서 개별 JSON을 내려받아 등록해 주세요.',
  version: '지원하지 않는 방송 구성 버전입니다.',
  sessions: '재현할 분석 세션이 하나도 없습니다.',
  activeMode: '시작 분석 화면이 포함된 세션과 일치하지 않습니다.',
  extension: '방송 구성 파일은 .json만 등록할 수 있습니다.',
};

const isObject = (value) => Boolean(value && typeof value === 'object' && !Array.isArray(value));

export const getIncludedSessionModes = (sessions) => {
  if (!isObject(sessions)) return [];
  return SUPPORTED_MODES.filter((mode) => isObject(sessions[mode]));
};

export const assertJsonExtension = (fileName) => {
  const name = String(fileName || '').trim().toLowerCase();
  if (!name.endsWith('.json')) {
    throw new Error(MESSAGES.extension);
  }
};

/**
 * Client-side validation (no crypto hash). Server recomputes hash on upload.
 * Does not mutate or re-stringify the original text.
 */
export const validatePresentationConfigText = (text, { originalFileName, fileSize } = {}) => {
  if (originalFileName) {
    assertJsonExtension(originalFileName);
  }

  const size = typeof fileSize === 'number' ? fileSize : new TextEncoder().encode(text || '').byteLength;
  if (size > MAX_PRESENTATION_CONFIG_BYTES) {
    throw new Error(MESSAGES.size);
  }
  if (!text || size === 0) {
    throw new Error(MESSAGES.format);
  }

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    throw new Error(MESSAGES.format);
  }

  if (!isObject(parsed)) {
    throw new Error(MESSAGES.format);
  }

  if (parsed.type === PRESENTATION_CONFIG_BUNDLE_TYPE) {
    throw new Error(MESSAGES.bundle);
  }

  if (parsed.type !== PRESENTATION_CONFIG_TYPE) {
    throw new Error(MESSAGES.format);
  }

  if (Number(parsed.schemaVersion) !== PRESENTATION_CONFIG_SCHEMA_VERSION) {
    throw new Error(MESSAGES.version);
  }

  const sessionModes = getIncludedSessionModes(parsed.sessions);
  if (sessionModes.length === 0) {
    throw new Error(MESSAGES.sessions);
  }

  const activeMode = String(parsed.startup?.activeMode || '').trim();
  if (!sessionModes.includes(activeMode)) {
    throw new Error(MESSAGES.activeMode);
  }

  return {
    originalFileName: originalFileName || null,
    fileSize: size,
    name: typeof parsed.name === 'string' ? parsed.name.trim() : '',
    schemaVersion: PRESENTATION_CONFIG_SCHEMA_VERSION,
    activeMode,
    sessionModes,
  };
};

export {
  PRESENTATION_CONFIG_TYPE,
  PRESENTATION_CONFIG_BUNDLE_TYPE,
  PRESENTATION_CONFIG_SCHEMA_VERSION,
  MAX_PRESENTATION_CONFIG_BYTES,
  SUPPORTED_MODES,
};
