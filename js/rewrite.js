const controllerTLS = "192.168.1.1:9443";
const controllerSecret = "my-secret-token";
const tlsCertificate = `-----BEGIN CERTIFICATE-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7
-----END CERTIFICATE-----`;
const tlsKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQ
-----END PRIVATE KEY-----`;

// 🔧 条件覆写 external-controller-tls 和 secret
function overrideControllerTLSAndSecret(config) {
  const ctl = config["external-controller"];
  if (ctl && ctl.trim() !== "") {
    config["external-controller-tls"] = controllerTLS;
    config["secret"] = controllerSecret;
    config["tls-certificate"] = tlsCertificate;
    config["tls-key"] = tlsKey;
  }
}

// 🔧 示例：订阅 URL 覆写（可选）
function overrideProxyProviders(config) {
  const newUrls = {
    "pref": "https://example.com/a.yaml",
    "bak": "https://example.com/b.yaml",
    "free": "https://example.com/c.yaml"
  };

  const providers = config["proxy-providers"];
  if (providers) {
    for (const name in newUrls) {
      if (providers[name]) {
        providers[name].url = newUrls[name];
      }
    }
  }
}

// 🧠 主函数：统一调用
const main = (config) => {
  overrideControllerTLSAndSecret(config);
  overrideProxyProviders(config);
  return config;
};