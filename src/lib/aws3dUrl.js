/**
 * Attach configFile query to a service URL without breaking existing query/hash.
 */
export const withConfigFile = (serviceUrl, publicRelativePath) => {
  if (!publicRelativePath) {
    return serviceUrl;
  }
  const url = new URL(serviceUrl);
  url.searchParams.set('configFile', publicRelativePath);
  return url.toString();
};

/**
 * Apply aws3d config to web sources.
 * srcLocal stays as the user-entered base URL; srcRemote becomes the launch URL.
 */
export const applyAws3dConfigToSources = (sources, publicRelativePath) => {
  if (!Array.isArray(sources)) return sources;
  return sources.map((source) => {
    if (source.srcType !== 'web') return source;
    const baseUrl = source.srcLocal || source.src || source.srcRemote;
    if (!baseUrl || typeof baseUrl !== 'string' || !baseUrl.startsWith('http')) {
      return source;
    }
    return {
      ...source,
      srcLocal: baseUrl,
      srcRemote: publicRelativePath ? withConfigFile(baseUrl, publicRelativePath) : baseUrl,
    };
  });
};
