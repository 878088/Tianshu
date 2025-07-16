import { connect } from 'cloudflare:sockets';

const 哎呀呀这是我的ID啊 = "123456";
const 哎呀呀这是我的VL密钥 = "743539b7-56e6-4210-a3c5-b8debcef162f";

export default {
  async fetch(访问请求) {
    const 验证安全密钥 = 访问请求.headers.get('safe-key');
    if (验证安全密钥 !== 哎呀呀这是我的ID啊) {
      return new Response('Forbidden', { status: 403 });
    }
    const 启用反代功能String = 访问请求.headers.get('proxyip-open');
    const 启用SOCKS5反代String = 访问请求.headers.get('socks5-open');
    const 启用SOCKS5全局反代String = 访问请求.headers.get('socks5-global');
    const 启动控流机制String = 访问请求.headers.get('kongliu-open');
    const 私钥开关String = 访问请求.headers.get('key-open');
    启用反代功能 = 启用反代功能String === 'true';
    启用SOCKS5反代 = 启用SOCKS5反代String === 'true';
    启用SOCKS5全局反代 = 启用SOCKS5全局反代String === 'true';
    启动控流机制 = 启动控流机制String === 'true';
    私钥开关 = 私钥开关String === 'true';
    反代IP = 访问请求.headers.get('proxyip');
    我的SOCKS5账号 = 访问请求.headers.get('socks5');
    return await 升级WS请求(访问请求);
  }
};

let 启用反代功能, 反代IP, 启用SOCKS5反代, 启用SOCKS5全局反代, 我的SOCKS5账号, 启动控流机制, 私钥开关;
let 访问地址, 访问端口;

async function 升级WS请求(访问请求) {
  const 创建WS接口 = new WebSocketPair();
  const [客户端, WS接口] = Object.values(创建WS接口);
  const 读取我的加密访问内容数据头 = 访问请求.headers.get('sec-websocket-protocol');
  const 解密数据 = 使用64位加解密(读取我的加密访问内容数据头);
  if (!解密数据) {
    return new Response('Base64 解码失败', { status: 400 });
  }
  await 解析VL标头(解密数据, WS接口);
  return new Response(null, { status: 101, webSocket: 客户端 });
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

async function 解析VL标头(VL数据, WS接口) {
  if (!私钥开关 && 验证VL的密钥(new Uint8Array(VL数据.slice(1, 17))) !== 哎呀呀这是我的VL密钥) {
    return new Response('连接验证失败', { status: 400 });
  }
  const 获取数据定位 = new Uint8Array(VL数据)[17];
  const 提取端口索引 = 18 + 获取数据定位 + 1;
  const 建立端口缓存 = VL数据.slice(提取端口索引, 提取端口索引 + 2);
  访问端口 = new DataView(建立端口缓存).getUint16(0);
  const 提取地址索引 = 提取端口索引 + 2;
  const 建立地址缓存 = new Uint8Array(VL数据.slice(提取地址索引, 提取地址索引 + 1));
  const 识别地址类型 = 建立地址缓存[0];
  let 地址长度 = 0;
  let 地址信息索引 = 提取地址索引 + 1;
  switch (识别地址类型) {
    case 1:
      地址长度 = 4;
      访问地址 = new Uint8Array(VL数据.slice(地址信息索引, 地址信息索引 + 地址长度)).join('.');
      break;
    case 2:
      地址长度 = new Uint8Array(VL数据.slice(地址信息索引, 地址信息索引 + 1))[0];
      地址信息索引 += 1;
      访问地址 = new TextDecoder().decode(VL数据.slice(地址信息索引, 地址信息索引 + 地址长度));
      break;
    case 3:
      地址长度 = 16;
      const dataView = new DataView(VL数据.slice(地址信息索引, 地址信息索引 + 地址长度));
      const ipv6 = [];
      for (let i = 0; i < 8; i++) { ipv6.push(dataView.getUint16(i * 2).toString(16)); }
      访问地址 = ipv6.join(':');
      break;
    default:
      return new Response('无效的访问地址', { status: 400 });
  }
  const 写入初始数据 = VL数据.slice(地址信息索引 + 地址长度);
  const TCP接口 = await 尝试建立TCP连接(访问地址, 访问端口, 识别地址类型);
  if (!TCP接口) {
    return new Response('连接握手失败', { status: 400 });
  }
  建立传输管道(WS接口, TCP接口, 写入初始数据);
}

async function 尝试建立TCP连接(地址, 端口, 地址类型) {
  let TCP接口;
  console.log(`尝试建立 TCP 连接: ${地址}:${端口}, 类型: ${地址类型}`);
  try {
    TCP接口 = connect({ hostname: 地址, port: 端口 });
    await Promise.race([
      TCP接口.opened,
      new Promise((_, reject) => setTimeout(() => reject(new Error('TCP 连接超时')), 1000))
    ]);
    console.log(`直接连接成功: ${地址}:${端口}`);
    return TCP接口;
  } catch (error) {
    console.warn(`直接连接失败: ${地址}:${端口}, 错误: ${error.message}`);
  }
  if (启用反代功能) {
    try {
      let [反代IP地址, 反代IP端口] = 反代IP.split(':');
      反代IP端口 = 反代IP端口 || 端口;
      TCP接口 = connect({ hostname: 反代IP地址, port: 反代IP端口 });
      await Promise.race([
        TCP接口.opened,
        new Promise((_, reject) => setTimeout(() => reject(new Error('反代连接超时')), 1000))
      ]);
      console.log(`反代连接成功: ${反代IP地址}:${反代IP端口}`);
      return TCP接口;
    } catch (error) {
      console.warn(`反代连接失败: ${反代IP地址}:${反代IP端口}, 错误: ${error.message}`);
    }
  }
  if (启用SOCKS5反代 || 启用SOCKS5全局反代) {
    try {
      TCP接口 = await 创建SOCKS5接口(地址类型, 地址, 端口);
      console.log(`SOCKS5 连接成功: ${地址}:${端口}`);
      return TCP接口;
    } catch (error) {
      console.warn(`SOCKS5 连接失败: ${地址}:${端口}, 错误: ${error.message}`);
    }
  }
  console.error(`所有连接尝试失败: ${地址}:${端口}`);
  return null;
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

async function 建立传输管道(WS接口, TCP接口, 写入初始数据, 写入队列 = Promise.resolve(), 回写队列 = Promise.resolve()) {
  let 连接开始时间 = performance.now();
  let 累计接收字节数 = 0;
  let 异常结束 = false;
  let 结束原因;
  let 已清理资源 = false;
  const 总数据阶梯延迟 = [
    { size: 1 * 1024 * 1024, delay: 100 },
    { size: 100 * 1024 * 1024, delay: 150 },
    { size: 200 * 1024 * 1024, delay: 200 },
  ];
  function 获取当前总延迟() {
    return (总数据阶梯延迟.slice().reverse().find(({ size }) => 累计接收字节数 >= size) ?? { delay: 300 }).delay;
  }
  WS接口.accept();
  WS接口.send(new Uint8Array([0, 0]));
  const 传输数据 = TCP接口.writable.getWriter();
  const 读取数据 = TCP接口.readable.getReader();
  if (写入初始数据) 写入队列 = 写入队列.then(() => 传输数据.write(写入初始数据)).catch();
  WS接口.addEventListener('message', event => 写入队列 = 写入队列.then(() => 传输数据.write(event.data)).catch());
  启动回传();
  async function 启动回传() {
    let 字节计数 = 0;
    try {
      while (!已清理资源) {
        const { done: 流结束, value: 返回数据 } = await 带超时读取(读取数据);
        if (流结束) {
          await 清理资源();
          break;
        }
        if (返回数据.length > 0) {
          累计接收字节数 += 返回数据.length;
          回写队列 = 回写队列.then(() => WS接口.send(返回数据)).catch();
          if (启动控流机制 && 访问地址 !== 'smtp.office365.com' && (累计接收字节数 - 字节计数) > 4*1024*1024) {
            console.log(`稍等一会，当前接收数据: ${格式化字节(累计接收字节数)}，当前运行时间: ${格式化时间(performance.now() - 连接开始时间)}`);
            await new Promise(resolve => setTimeout(resolve, 获取当前总延迟() + 1000));
            字节计数 = 累计接收字节数;
          }
        }
      }
    } catch (err) {
      异常结束 = true;
      结束原因 = err?.stack || String(err);
      await 清理资源();
    }
  }
  async function 带超时读取(读取数据) {
    const 是IP地址 = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$|^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(访问地址);
    const 是SMTP = 访问地址 === 'smtp.office365.com';
    const 保活 = 是IP地址 || 是SMTP || 匹配地址(访问地址, 保活域名名单);
    const 超时时间 = 是SMTP ? 300000 : 保活 ? 3000 : 30000;
    return new Promise((resolve, reject) => {
      let 超时计时器;
      let 保活计时器;
      let 已启动保活 = false;
      const 清理计时器 = () => {
        clearTimeout(超时计时器);
        if (保活计时器) clearInterval(保活计时器);
      };
      超时计时器 = setTimeout(() => {
        if (保活 && !已启动保活) {
          已启动保活 = true;
          console.log(`启动保活机制: ${访问地址}`);
          写入队列 = 写入队列.then(() => 传输数据.write(new Uint8Array(0))).catch();
          回写队列 = 回写队列.then(() => WS接口.send(new Uint8Array(0))).catch();
          保活计时器 = setInterval(() => {
            console.log(`保活包: ${访问地址}`);
            写入队列 = 写入队列.then(() => 传输数据.write(new Uint8Array(0))).catch();
            回写队列 = 回写队列.then(() => WS接口.send(new Uint8Array(0))).catch();
          }, 5000);
        } else if (!保活) {
          清理计时器();
          reject(new Error('读取超时'));
        }
      }, 超时时间);
      读取数据.read()
        .then(结果 => {
          清理计时器();
          resolve(结果);
        })
        .catch(err => {
          清理计时器();
          reject(err);
        });
    });
  }
  async function 清理资源() {
    if (已清理资源) return;
    已清理资源 = true;
    try {
      await Promise.all([
        TCP接口.close?.(),
        WS接口.close?.(1000),
        传输数据.releaseLock?.(),
        读取数据.releaseLock?.()
      ]);
      console.log(`资源清理完成: ${访问地址}`);
    } catch (e) {
      console.error(`资源清理失败: ${e.message}`);
    }
  }
  function 格式化字节(数据字节, 保留位数 = 2) {
    const 单位 = ['B', 'KB', 'MB', 'GB', 'TB'];
    let 指数 = 0;
    let 数值 = 数据字节;
    while (数值 >= 1024 && 指数 < 单位.length - 1) {
      数值 /= 1024;
      指数++;
    }
    return `${数值.toFixed(保留位数)} ${单位[指数]}`;
  }
  function 格式化时间(毫秒数) {
    const 总毫秒 = 毫秒数;
    const 小时 = Math.floor(总毫秒 / (3600 * 1000));
    const 分钟 = Math.floor((总毫秒 % (3600 * 1000)) / (60 * 1000));
    const 秒 = Math.floor((总毫秒 % (60 * 1000)) / 1000);
    const 毫秒 = 总毫秒 % 1000;
    return `${小时.toString().padStart(2, '0')}:${分钟.toString().padStart(2, '0')}:${秒.toString().padStart(2, '0')}.${毫秒.toString().padStart(3, '0')}`;
  }
  function 匹配地址(地址, 域名名单) {
    const 是IPv4 = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/.test(地址);
    const 是IPv6 = /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9]))$/.test(地址);
    if (是IPv4 || 是IPv6) return true;
    return 域名名单.some(规则 => 匹配域名(地址, 规则));
  }
  function 匹配域名(地址, 通配规则) {
    if (通配规则.startsWith('*.')) {
      const 根域 = 通配规则.slice(2);
      return (
        地址 === 根域 ||
        地址.endsWith('.' + 根域)
      );
    }
    return 地址 === 通配规则;
  }
}

async function 创建SOCKS5接口(识别地址类型, 访问地址, 访问端口) {
  const { 账号, 密码, 地址, 端口 } = await 获取SOCKS5账号(我的SOCKS5账号);
  const SOCKS5接口 = connect({ hostname: 地址, port: 端口 });
  try {
    await SOCKS5接口.opened;
  } catch {
    return new Response('SOCKS5未连通', { status: 400 });
  }
  const 传输数据 = SOCKS5接口.writable.getWriter();
  const 读取数据 = SOCKS5接口.readable.getReader();
  const 转换数组 = new TextEncoder();
  const 构建S5认证 = new Uint8Array([5, 2, 0, 2]);
  await 传输数据.write(构建S5认证);
  const 读取认证要求 = (await 读取数据.read()).value;
  if (读取认证要求[1] === 0x02) {
    if (!账号 || !密码) {
      return 关闭接口并退出();
    }
    const 构建账号密码包 = new Uint8Array([1, 账号.length, ...转换数组.encode(账号), 密码.length, ...转换数组.encode(密码)]);
    await 传输数据.write(构建账号密码包);
    const 读取账号密码认证结果 = (await 读取数据.read()).value;
    if (读取账号密码认证结果[0] !== 0x01 || 读取账号密码认证结果[1] !== 0x00) {
      return 关闭接口并退出();
    }
  }
  let 转换访问地址;
  switch (识别地址类型) {
    case 1:
      转换访问地址 = new Uint8Array([1, ...访问地址.split('.').map(Number)]);
      break;
    case 2:
      转换访问地址 = new Uint8Array([3, 访问地址.length, ...转换数组.encode(访问地址)]);
      break;
    case 3:
      转换访问地址 = new Uint8Array([4, ...访问地址.split(':').flatMap(x => [parseInt(x.slice(0, 2), 16), parseInt(x.slice(2), 16)])]);
      break;
    default:
      return 关闭接口并退出();
  }
  const 构建转换后的访问地址 = new Uint8Array([5, 1, 0, ...转换访问地址, 访问端口 >> 8, 访问端口 & 0xff]);
  await 传输数据.write(构建转换后的访问地址);
  const 检查返回响应 = (await 读取数据.read()).value;
  if (检查返回响应[0] !== 0x05 || 检查返回响应[1] !== 0x00) {
    return 关闭接口并退出();
  }
  传输数据.releaseLock();
  读取数据.releaseLock();
  return SOCKS5接口;
  function 关闭接口并退出() {
    传输数据.releaseLock();
    读取数据.releaseLock();
    SOCKS5接口.close();
    return new Response('SOCKS5握手失败', { status: 400 });
  }
}

async function 获取SOCKS5账号(SOCKS5) {
  const [账号段, 地址段] = SOCKS5.split("@");
  const [账号, 密码] = [账号段.slice(0, 账号段.lastIndexOf(":")), 账号段.slice(账号段.lastIndexOf(":") + 1)];
  const [地址, 端口] = [地址段.slice(0, 地址段.lastIndexOf(":")), 地址段.slice(地址段.lastIndexOf(":") + 1)];
  return { 账号, 密码, 地址, 端口 };
}

const 保活域名名单 = [
  '*.chatgpt.com',
  '*.openai.com',
  '*.apis.google.com',
  '*.mtalk.google.com',
  '*.wns.windows.com',
  '*.alive.github.com',
  '*.googlevideo.com',
  '*.firebaseio.com',
  '*.googleapis.com',
  '*.fcm.googleapis.com',
  '*.firebaseinstallations.googleapis.com',
  '*.googleusercontent.com',
  '*.t.me', 't.me',
  '*.telegram.org',
  '*.telegram.me',
  '*.telegra.ph',
  '*.cdn-telegram.org',
  '*.twitch.tv',
  '*.ttvnw.net',
  '*.jtvnw.net',
  '*.ext-twitch.tv',
  '*.api.twitch.tv',
  '*.twitchcdn.net',
  '*.discord.com',
  '*.discordapp.com',
  '*.discord.media',
  '*.discord.gg',
  '*.whatsapp.net',
  '*.whatsapp.com',
  'web.whatsapp.com',
  '*.signal.org',
  '*.whispersystems.org',
  '*.facebook.com',
  '*.messenger.com',
  '*.fbcdn.net',
  '*.instagram.com',
  '*.cdninstagram.com',
  '*.twitter.com',
  '*.twimg.com',
  '*.line.me',
  '*.line-scdn.net',
  '*.wechat.com',
  '*.wechatapp.com',
  '*.wx.qq.com',
  '*.tiktok.com',
  '*.muscdn.com',
  '*.byteoversea.com',
  '*.zoom.us',
  '*.zoom.com',
  '*.teams.microsoft.com',
  '*.skype.com',
  '*.outlook.com',
  '*.office.com',
  '*.slack.com',
  '*.slack-edge.com',
  '*.push.apple.com',
  '*.icloud.com',
  '*.imessage.com',
  '*.snapchat.com',
  '*.sc-cdn.net',
  '*.reddit.com',
  '*.redditmedia.com',
  '*.clubhouseapi.com',
  '*.threads.net',
  'smtp.office365.com',
];