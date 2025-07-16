import { connect } from 'cloudflare:sockets';

let 哎呀呀这是我的ID啊 = "123456";
let 哎呀呀这是我的VL密钥 = "ae12b13c-cacc-1ea6-bb51-5a70cc0a72a8";
let 私钥开关 = false;
let 咦这是我的私钥哎 = "";
let 隐藏订阅 = false;
let 嘲讽语 = "什么也没有";
let 我的优选 = [
  // 'www.visa.com',
];
let 我的优选TXT = [''];
let 启用反代功能 = true;
let 反代IP = 'fdip.houyitfg.asia';
let 启用SOCKS5反代 = false;
let 启用SOCKS5全局反代 = false;
let 我的SOCKS5账号 = 'admin:admin@52.71.4.197:1080';
let 我的节点名字 = '天书11';
let 启动控流机制 = false;
let 转发地址 = ['hz-e94.pages.dev', 'fff-7rn.pages.dev', 'ffff-3oh.pages.dev', 'fffff-9gd.pages.dev', 'df-2dq.pages.dev'];

const 读取环境变量 = (name, fallback, env) => {
  const raw = env?.[name];
  if (raw === undefined || raw === null || raw === '') return fallback;
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (trimmed === 'true') return true;
    if (trimmed === 'false') return false;
    if (trimmed.includes('\n')) {
      return trimmed.split('\n').map(item => item.trim()).filter(Boolean);
    }
    if (!isNaN(trimmed) && trimmed !== '') return Number(trimmed);
    return trimmed;
  }
  return raw;
};

export default {
  async fetch(访问请求, env) {
    哎呀呀这是我的ID啊 = 读取环境变量('ID', 哎呀呀这是我的ID啊, env);
    哎呀呀这是我的VL密钥 = 读取环境变量('UUID', 哎呀呀这是我的VL密钥, env);
    我的优选 = 读取环境变量('IP', 我的优选, env);
    我的优选TXT = 读取环境变量('TXT', 我的优选TXT, env);
    启动控流机制 = 读取环境变量('KL', 启动控流机制, env);
    反代IP = 读取环境变量('PROXYIP', 反代IP, env);
    我的SOCKS5账号 = 读取环境变量('SOCKS5', 我的SOCKS5账号, env);
    启用SOCKS5反代 = 读取环境变量('SOCKS5OPEN', 启用SOCKS5反代, env);
    启用SOCKS5全局反代 = 读取环境变量('SOCKS5GLOBAL', 启用SOCKS5全局反代, env);
    咦这是我的私钥哎 = 读取环境变量('私钥', 咦这是我的私钥哎, env);
    隐藏订阅 = 读取环境变量('隐藏', 隐藏订阅, env);
    私钥开关 = 读取环境变量('私钥开关', 私钥开关, env);
    嘲讽语 = 读取环境变量('嘲讽语', 嘲讽语, env);
    启用反代功能 = 读取环境变量('启用反代功能', 启用反代功能, env);
    我的节点名字 = 读取环境变量('我的节点名字', 我的节点名字, env);
    转发地址 = 读取环境变量('转发地址', 转发地址, env);
    console.log(`转发地址: ${JSON.stringify(转发地址)}`);

    const 规则集配置 = env.RULE_PROVIDERS || null;
    const 规则配置 = env.RULES || null;
    const 读取我的请求标头 = 访问请求.headers.get('Upgrade');
    const url = new URL(访问请求.url);

    if (!读取我的请求标头 || 读取我的请求标头 !== 'websocket') {
      if (我的优选TXT && 我的优选TXT.length > 0) {
        const 链接数组 = Array.isArray(我的优选TXT) ? 我的优选TXT : [我的优选TXT];
        const 所有节点 = [];
        for (const 链接 of 链接数组) {
          try {
            const 响应 = await fetch(链接);
            const 文本 = await 响应.text();
            const 节点 = 文本.split('\n').map(line => line.trim()).filter(line => line);
            所有节点.push(...节点);
          } catch (e) {
            console.warn(`无法获取或解析链接: ${链接}`, e);
          }
        }
        if (所有节点.length > 0) {
          我的优选 = 所有节点;
        }
      }
      switch (url.pathname) {
        case `/${哎呀呀这是我的ID啊}`: {
          const 订阅页面 = 给我订阅页面(哎呀呀这是我的ID啊, 访问请求.headers.get('Host'));
          return new Response(`${订阅页面}`, {
            status: 200,
            headers: { "Content-Type": "text/plain;charset=utf-8" }
          });
        }
        case `/${哎呀呀这是我的ID啊}/${转码}${转码2}`: {
          if (隐藏订阅) {
            return new Response(`${嘲讽语}`, {
              status: 200,
              headers: { "Content-Type": "text/plain;charset=utf-8" }
            });
          } else {
            const 通用配置文件 = 给我通用配置文件(访问请求.headers.get('Host'));
            return new Response(`${通用配置文件}`, {
              status: 200,
              headers: { "Content-Type": "text/plain;charset=utf-8" }
            });
          }
        }
        case `/${哎呀呀这是我的ID啊}/${小猫}${咪}`: {
          if (隐藏订阅) {
            return new Response(`${嘲讽语}`, {
              status: 200,
              headers: { "Content-Type": "text/plain;charset=utf-8" }
            });
          } else {
            const 小动物配置文件 = 给我小动物配置文件(访问请求.headers.get('Host'), 规则集配置, 规则配置);
            return new Response(`${小动物配置文件}`, {
              status: 200,
              headers: { "Content-Type": "text/plain;charset=utf-8" }
            });
          }
        }
        default:
          return new Response('Hello World!', { status: 200 });
      }
    } else if (读取我的请求标头 === 'websocket') {
      if (私钥开关) {
        const 验证我的私钥 = 访问请求.headers.get('my-key');
        if (验证我的私钥 !== 咦这是我的私钥哎) {
          return new Response('私钥验证失败', { status: 403 });
        }
      }
      return await 负载均衡(访问请求);
    }
  }
};

async function 负载均衡(访问请求) {
  const 读取我的加密访问内容数据头 = 访问请求.headers.get('sec-websocket-protocol');
  const 解密数据 = 使用64位加解密(读取我的加密访问内容数据头);
  if (!解密数据) {
    return new Response('Base64 解码失败', { status: 400 });
  }
  if (!私钥开关 && 验证VL的密钥(new Uint8Array(解密数据.slice(1, 17))) !== 哎呀呀这是我的VL密钥) {
    return new Response('连接验证失败', { status: 403 });
  }
  let 尝试次数 = 2; // 最多重试 2 次
  while (尝试次数 > 0) {
    try {
      const 请求列表 = await 构建新请求(访问请求);
      if (请求列表.length === 0) {
        console.error('无可用副 Worker：转发地址为空');
        return new Response('无可用副 Worker：转发地址为空', { status: 400 });
      }
      const 响应 = await Promise.any(
        请求列表.map(async (请求, 索引) => {
          console.log(`请求副 Worker: ${请求.url}`);
          const 控制器 = new AbortController();
          const 超时 = setTimeout(() => 控制器.abort(), 10000);
          try {
            const 响应 = await fetch(请求, { signal: 控制器.signal });
            clearTimeout(超时);
            console.log(`副 Worker ${请求.url} 响应状态: ${响应.status}`);
            return 响应.status === 101 ? 响应 : Promise.reject(`副 Worker ${请求.url} 状态码不是101`);
          } catch (错误) {
            clearTimeout(超时);
            console.error(`副 Worker ${请求.url} 请求失败: ${错误.message}`);
            throw 错误;
          }
        })
      );
      console.log(`负载均衡选择成功: ${响应.url}`);
      return 响应;
    } catch (错误) {
      console.error(`负载均衡失败: ${错误.message}, 剩余尝试次数: ${尝试次数 - 1}`);
      尝试次数--;
      if (尝试次数 === 0) {
        return new Response(`无可用副 Worker: ${错误.message}`, { status: 400 });
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

function 使用64位加解密(还原混淆字符) {
  try {
    if (!还原混淆字符 || 还原混淆字符.length > 16384) {
      throw new Error('无效或过长的 Base64 数据');
    }
    还原混淆字符 = 还原混淆字符.replace(/-/g, '+').replace(/_/g, '/');
    const 解密数据 = atob(还原混淆字符);
    return Uint8Array.from(解密数据, c => c.charCodeAt(0)).buffer;
  } catch (e) {
    console.error(`Base64 解码失败: ${e.message}`);
    return null;
  }
}

function 验证VL的密钥(字节数组, 起始位置 = 0) {
  const 十六进制表 = Array.from({ length: 256 }, (_, 值) =>
    (值 + 256).toString(16).slice(1)
  );
  const 分段结构 = [4, 2, 2, 2, 6];
  let 当前索引 = 起始位置;
  const 格式化UUID = 分段结构
    .map(段长度 =>
      Array.from({ length: 段长度 }, () => 十六进制表[字节数组[当前索引++]]).join('')
    )
    .join('-')
    .toLowerCase();
  return 格式化UUID;
}

async function 构建新请求(访问请求) {
  const 标头 = new Headers(访问请求.headers);
  标头.set('key-open', 私钥开关 ? 'true' : 'false');
  标头.set('proxyip-open', 启用反代功能 ? 'true' : 'false');
  标头.set('socks5-open', 启用SOCKS5反代 ? 'true' : 'false');
  标头.set('socks5-global', 启用SOCKS5全局反代 ? 'true' : 'false');
  标头.set('safe-key', 哎呀呀这是我的ID啊);
  标头.set('kongliu-open', 启动控流机制 ? 'true' : 'false');
  const 请求列表 = [];
  const 随机选择 = (数组) => {
    const arr = Array.isArray(数组) ? 数组 : [数组];
    return arr[Math.floor(Math.random() * arr.length)];
  };
  for (const 地址 of 转发地址) {
    const 反代 = 随机选择(反代IP);
    const socks5 = 随机选择(我的SOCKS5账号);
    标头.set('proxyip', 反代);
    标头.set('socks5', socks5);
    const 目标地址 = `https://${地址}`;
    const 新请求 = new Request(目标地址, {
      headers: 标头,
      method: 访问请求.method
    });
    请求列表.push(新请求);
  }
  return 请求列表;
}

let 转码 = 'vl', 转码2 = 'ess', 符号 = '://', 小猫 = 'cla', 咪 = 'sh', 我的私钥;
if (私钥开关) {
  我的私钥 = `my-key: ${咦这是我的私钥哎}`;
} else {
  我的私钥 = "";
}
let 缓存订阅页面 = null;
function 给我订阅页面(哎呀呀这是我的ID啊, hostName) {
  if (缓存订阅页面) return 缓存订阅页面;
  缓存订阅页面 = `
    1、本worker的私钥功能只支持${小猫}${咪}，仅open${小猫}${咪}和${小猫}${咪} meta测试过，其他${小猫}${咪}类软件自行测试
    2、若使用通用订阅请关闭私钥功能
    3、其他需求自行研究
    通用的：https${符号}${hostName}/${哎呀呀这是我的ID啊}/${转码}${转码2}
    猫咪的：https${符号}${hostName}/${哎呀呀这是我的ID啊}/${小猫}${咪}
  `;
  return 缓存订阅页面;
}
function 给我通用配置文件(hostName) {
  if (私钥开关) return "请先关闭私钥功能";
  const 节点列表 = 我的优选.concat(`${hostName}:443#备用节点`);
  const 配置 = [];
  for (const 获取优选 of 节点列表) {
    const [主内容, tls = 'tls'] = 获取优选.split("@");
    const [地址端口, 节点名字 = 我的节点名字] = 主内容.split("#");
    const [地址, 端口 = '443'] = 地址端口.split(":");
    配置.push(
      `${转码}${转码2}${符号}${哎呀呀这是我的VL密钥}@${地址}:${端口}?encryption=none&security=${tls === 'notls' ? 'none' : 'tls'}&sni=${hostName}&type=ws&host=${hostName}&path=%2F%3Fed%3D2560#${节点名字}`
    );
  }
  return 配置.join("\n");
}
function 给我小动物配置文件(hostName, 规则集配置 = null, 规则配置 = null) {
  const 唯一节点映射 = new Map();
  const 节点配置列表 = [];
  const 代理配置列表 = [];
  const 备用节点标识 = `${hostName}:443`;
  唯一节点映射.set(备用节点标识, "备用节点");
  我的优选.push(`${hostName}:443#备用节点`);
  for (const 获取优选 of 我的优选) {
    const [主内容, tls] = 获取优选.split("@");
    const [地址端口, 原始节点名字] = 主内容.split("#");
    const 拆分地址端口 = 地址端口.split(":");
    const 端口 = 拆分地址端口.length > 1 ? Number(拆分地址端口.pop()) || 443 : 443;
    const 地址 = 拆分地址端口.join(":").replace(/^\[(.+)\]$/, '$1');
    const TLS开关 = tls === 'notls' ? 'false' : 'true';
    const 节点标识符 = `${地址}:${端口}`;
    if (唯一节点映射.has(节点标识符)) continue;
    let 节点名称 = 原始节点名字 || `${地址.split('.')[0]}-${端口}`;
    let 后缀 = 1;
    let 唯一名称 = 节点名称;
    while (Array.from(唯一节点映射.values()).includes(唯一名称)) {
      后缀++;
      唯一名称 = `${节点名称}-${后缀}`;
    }
    节点名称 = 唯一名称;
    唯一节点映射.set(节点标识符, 节点名称);
    节点配置列表.push(`- name: ${节点名称}
  type: ${转码}${转码2}
  server: ${地址}
  port: ${端口}
  uuid: ${哎呀呀这是我的VL密钥}
  udp: false
  tls: ${TLS开关}
  sni: ${hostName}
  network: ws
  ws-opts:
    path: "/?ed=2560"
    headers:
      Host: ${hostName}
      ${我的私钥}`);
    代理配置列表.push(`    - ${节点名称}`);
  }
  const 节点配置 = 节点配置列表.join("\n");
  const 代理配置 = 代理配置列表.join("\n");
  const 默认规则集配置 = `
  AntiAd:
    type: http
    behavior: domain
    url: "https://gh-proxy.com/raw.githubusercontent.com/privacy-protection-tools/anti-AD/master/anti-ad-clash.yaml"
    path: ./ruleset/AntiAd.yaml
    interval: 86400
  lancidr:
    type: http
    behavior: ipcidr
    url: "https://gh-proxy.com/raw.githubusercontent.com/Loyalsoldier/clash-rules/release/lancidr.txt"
    path: ./ruleset/lancidr.yaml
    interval: 86400
  cncidr:
    type: http
    behavior: ipcidr
    url: "https://gh-proxy.com/raw.githubusercontent.com/Loyalsoldier/clash-rules/release/cncidr.txt"
    path: ./ruleset/cncidr.yaml
    interval: 86400`;
  const 默认规则配置 = `
- RULE-SET,AntiAd,REJECT
- RULE-SET,lancidr,DIRECT,no-resolve
- RULE-SET,cncidr,DIRECT,no-resolve
- GEOSITE,cn,DIRECT
- GEOIP,CN,DIRECT,no-resolve
- MATCH,漏网之鱼,🚀 负载均衡-散列`;
  return `
dns:
  nameserver:
    - 114.114.114.114
    - 2400:da00::6666
  fallback:
    - 8.8.8.8
    - 2001:4860:4860::8888
rule-providers:
${规则集配置 !== null ? 规则集配置 : 默认规则集配置}
proxies:
${节点配置}
proxy-groups:
- name: 🚀 负载均衡-散列
  type: load-balance
  strategy: consistent-hashing
  url: http://www.gstatic.com/generate_204
  interval: 300
  unified-delay: true
  proxies:
${代理配置}
- name: 🚀 负载均衡-轮询
  type: load-balance
  strategy: round-robin
  url: http://www.gstatic.com/generate_204
  interval: 300
  unified-delay: true
  proxies:
${代理配置}
- name: 🚀 节点选择
  type: select
  proxies:
    - 自动选择
    - 🚀 负载均衡-散列
    - 🚀 负载均衡-轮询
${代理配置}
- name: 自动选择
  type: url-test
  url: http://www.gstatic.com/generate_204
  interval: 60
  tolerance: 30
  proxies:
${代理配置}
- name: 漏网之鱼
  type: select
  proxies:
    - 🚀 负载均衡-散列
    - 🚀 负载均衡-轮询
    - 🚀 节点选择
rules:
${规则配置 !== null ? 规则配置 : 默认规则配置}
`;
}