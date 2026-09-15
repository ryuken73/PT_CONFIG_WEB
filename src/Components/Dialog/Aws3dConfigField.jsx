import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import {
  SESSION_MODE_LABELS,
  validatePresentationConfigText,
} from 'lib/aws3dPresentationConfig';
import { withConfigFile } from 'lib/aws3dUrl';
import CONSTANTS from 'config/constants';

const { SERVER_URL } = CONSTANTS;

const Container = styled.div`
  margin-top: 12px;
  padding: 10px 12px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 8px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1a237e;
  margin-bottom: 8px;
`;

const MetaRow = styled.div`
  font-size: 12px;
  color: #0d1b4c;
  margin: 2px 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

const PreviewUrl = styled.div`
  margin-top: 8px;
  font-size: 11px;
  word-break: break-all;
  color: #263238;
`;

const HiddenInput = styled.input`
  display: none;
`;

const formatSessionModes = (modes = []) => {
  return modes.map((mode) => SESSION_MODE_LABELS[mode] || mode).join(', ');
};

/**
 * Optional AWS 3D presentation JSON attachment field.
 *
 * Props:
 * - aws3dConfig: saved metadata or null
 * - pendingFile: File selected but not yet uploaded
 * - pendingMeta: client-validated meta for pendingFile
 * - onSelectFile(file, meta)
 * - onClearPending()
 * - onRemoveSaved()
 * - previewServiceUrl: optional base web URL for launch URL preview
 */
const Aws3dConfigField = (props) => {
  const {
    aws3dConfig,
    pendingFile,
    pendingMeta,
    onSelectFile,
    onClearPending,
    onRemoveSaved,
    previewServiceUrl,
  } = props;

  const inputRef = React.useRef(null);

  const displayMeta = pendingMeta || aws3dConfig;
  const hasSaved = Boolean(aws3dConfig && aws3dConfig.publicRelativePath);
  const hasPending = Boolean(pendingFile && pendingMeta);

  const previewLaunchUrl =
    previewServiceUrl && hasSaved && !hasPending
      ? withConfigFile(previewServiceUrl, aws3dConfig.publicRelativePath)
      : previewServiceUrl && hasPending
        ? `${previewServiceUrl} (저장 시 configFile 적용)`
        : null;

  const openPicker = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const onFileChange = async (event) => {
    const file = event.target.files && event.target.files[0];
    event.target.value = '';
    if (!file) return;
    try {
      const text = await file.text();
      const meta = validatePresentationConfigText(text, {
        originalFileName: file.name,
        fileSize: file.size,
      });
      onSelectFile(file, meta);
    } catch (err) {
      alert(err.message || '방송 구성 JSON을 확인할 수 없습니다.');
    }
  };

  const onDownload = () => {
    if (!aws3dConfig || !aws3dConfig.publicRelativePath) return;
    const fileName = aws3dConfig.publicRelativePath.replace(/^configs\//, '');
    const url = `${SERVER_URL}/aws3d-configs/${fileName}`;
    window.open(url, '_blank');
  };

  return (
    <Container>
      <Title>AWS 3D 방송 구성 (선택)</Title>
      {!displayMeta && (
        <MetaRow>PC AWS 3D에서 내려받은 단일 구성 JSON을 첨부할 수 있습니다.</MetaRow>
      )}
      {displayMeta && (
        <>
          <MetaRow>
            파일명: {pendingFile ? pendingFile.name : displayMeta.originalFileName || '-'}
            {hasPending ? ' (업로드 대기)' : ''}
          </MetaRow>
          <MetaRow>구성 이름: {displayMeta.name || '-'}</MetaRow>
          <MetaRow>
            시작 분석 화면:{' '}
            {SESSION_MODE_LABELS[displayMeta.activeMode] || displayMeta.activeMode || '-'}
          </MetaRow>
          <MetaRow>
            포함된 분석 세션: {formatSessionModes(displayMeta.sessionModes)}
          </MetaRow>
          {hasSaved && displayMeta.publicRelativePath && (
            <MetaRow>경로: {displayMeta.publicRelativePath}</MetaRow>
          )}
        </>
      )}
      {previewLaunchUrl && (
        <PreviewUrl>
          실행 URL 미리보기: {previewLaunchUrl}
        </PreviewUrl>
      )}
      <Actions>
        <HiddenInput
          ref={inputRef}
          type="file"
          accept=".json,application/json"
          onChange={onFileChange}
        />
        <Button size="small" variant="contained" onClick={openPicker}>
          {displayMeta ? '교체' : 'JSON 선택'}
        </Button>
        {hasPending && (
          <Button size="small" variant="outlined" onClick={onClearPending}>
            선택 취소
          </Button>
        )}
        {hasSaved && !hasPending && (
          <>
            <Button size="small" variant="outlined" onClick={onDownload}>
              다운로드
            </Button>
            <Button size="small" color="error" variant="outlined" onClick={onRemoveSaved}>
              제거
            </Button>
          </>
        )}
      </Actions>
    </Container>
  );
};

export default React.memo(Aws3dConfigField);
