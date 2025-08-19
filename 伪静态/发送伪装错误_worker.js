import { connect } from 'cloudflare:sockets';

const 哎呀呀这是我的ID啊 = "878088";
const 哎呀呀这是我的VL密钥 = "8b508ee2-a0aa-4234-820b-065369cd9fc3";
const concurrency = 5;

const concurrentConnect = async (hostname, port, timeout) => {
    const socketPromises = Array(concurrency).fill(null).map(() => connect({ hostname, port }));
    const openedSocketPromises = socketPromises.map(async (socketPromise) => {
        const socket = await socketPromise;
        await Promise.race([
            socket.opened,
            new Promise((_, reject) => setTimeout(() => reject(new Error('TCP连接超时')), timeout))
        ]);
        return socket;
    });
    return await Promise.any(openedSocketPromises);
};

export default {
    async fetch(访问请求) {
        const url = new URL(访问请求.url);
        const 验证安全密钥 = 访问请求.headers.get('safe-key');
        if (验证安全密钥 !== 哎呀呀这是我的ID啊) {
            return new Response(JSON.stringify({ error: 'Forbidden' }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (url.pathname === '/api/proxy.json' && 访问请求.headers.get('Upgrade') === 'websocket') {
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

            const 下一级转发地址 = 访问请求.headers.get('next-vice-worker');
            if (下一级转发地址) {
                const 新标头 = new Headers(访问请求.headers);
                新标头.set('safe-key', 哎呀呀这是我的ID啊);
                
                const 新请求 = new Request(`https://${下一级转发地址}/api/proxy.json`, {
                    headers: 新标头,
                    method: 访问请求.method,
                });
                return await fetch(新请求);
            }

            return await 升级WS请求(访问请求);
        }

        return new Response(JSON.stringify({ message: 'This is a static proxy config' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
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
        return new Response('Base64解码失败', { status: 400 });
    }
    await 解析VL标头(解密数据, WS接口);
    return new Response(null, { status: 101, webSocket: 客户端 });
}

function 使用64位加解密(还原混淆字符) {
    try {
        if (!还原混淆字符 || 还原混淆字符.length > 16384) {
            throw new Error('无效的Base64数据');
        }
        还原混淆字符 = 还原混淆字符.replace(/-/g, '+').replace(/_/g, '/');
        const 解密数据 = atob(还原混淆字符);
        return Uint8Array.from(解密数据, c => c.charCodeAt(0)).buffer

    } catch (e) {
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

    const 命令索引 = 17 + 获取数据定位;
    const 命令 = new Uint8Array(VL数据)[命令索引];
    const 是UDP = 命令 === 2;
    const 是DNS = 是UDP && 访问端口 === 53;

    if (是DNS) {
        const 初始数据 = VL数据.slice(地址信息索引 + 地址长度);
        return 处理DNS查询(初始数据, WS接口);
    }

    const 写入初始数据 = VL数据.slice(地址信息索引 + 地址长度);
    const TCP接口 = await 尝试建立TCP连接(访问地址, 访问端口, 识别地址类型);
    if (!TCP接口) {
        return new Response('连接握手失败', { status: 400 });
    }
    return 建立传输管道(WS接口, TCP接口, 写入初始数据); // 修改：直接返回函数调用结果
}

// 修改：尝试建立TCP连接，添加并发连接支持
async function 尝试建立TCP连接(地址, 端口, 地址类型) {
    let TCP接口;
    const 是Telegram = 保活域名名单.some(规则 => 匹配域名(地址, 规则));
    const 超时时间 = 是Telegram ? 1500 : 1000;
    console.log(`尝试TCP连接: ${地址}:${端口}, 类型: ${地址类型}, Telegram: ${是Telegram}`);

    // 并发尝试直接连接
    try {
        TCP接口 = await concurrentConnect(地址, 端口, 超时时间);
        console.log(`直接连接成功: ${地址}:${端口}`);
        return TCP接口;
    } catch (error) {
        console.warn(`直接连接失败: ${地址}:${端口}, 错误: ${error.message}`);
    }

    // 并发尝试反代连接
    if (启用反代功能) {
        try {
            let [反代IP地址, 反代IP端口] = 反代IP.split(':');
            反代IP端口 = 反代IP端口 || 端口;
            TCP接口 = await concurrentConnect(反代IP地址, 反代IP端口, 超时时间);
            console.log(`反代连接成功: ${反代IP地址}:${反代IP端口}`);
            return TCP接口;
        } catch (error) {
            console.warn(`反代连接失败: ${反代IP}, 错误: ${error.message}`);
        }
    }

    // 并发尝试SOCKS5连接
    if (启用SOCKS5反代 || 启用SOCKS5全局反代) {
        try {
            TCP接口 = await 创建SOCKS5接口(识别地址类型, 地址, 端口);
            console.log(`SOCKS5连接成功: ${地址}:${端口}`);
            return TCP接口;
        } catch (error) {
            console.warn(`SOCKS5连接失败: ${地址}:${端口}, 错误: ${error.message}`);
        }
    }

    return null;
}

// === DNS处理函数 ===
async function 处理DNS查询(初始数据, WS接口) {
    const DNS_SERVER = '8.8.4.4';
    const DNS_PORT = 53;

    try {
        WS接口.accept();
        const tcpSocket = connect({ hostname: DNS_SERVER, port: DNS_PORT });
        const writer = tcpSocket.writable.getWriter();
        const len = 初始数据.byteLength;
        const lenBuffer = new ArrayBuffer(2);
        new DataView(lenBuffer).setUint16(0, len);
        const tcpDnsQuery = new Uint8Array([...new Uint8Array(lenBuffer), ...new Uint8Array(初始数据)]);
        await writer.write(tcpDnsQuery);

        WS接口.addEventListener('message', async (event) => {
            try {
                const query = new Uint8Array(event.data);
                const lenBuf = new ArrayBuffer(2);
                new DataView(lenBuf).setUint16(0, query.length);
                await writer.write(new Uint8Array([...new Uint8Array(lenBuf), ...query]));
            } catch (e) {
                console.error('处理后续DNS查询出错:', e);
            }
        });

        let buffer = new Uint8Array(0);
        const reader = tcpSocket.readable.getReader();

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer = new Uint8Array([...buffer, ...value]);
            while (buffer.length >= 2) {
                const length = new DataView(buffer.buffer, 0, 2).getUint16(0);
                if (buffer.length < 2 + length) break;

                const dnsResponse = buffer.slice(2, 2 + length);
                buffer = buffer.slice(2 + length);

                if (WS接口.readyState === 1) {
                    WS接口.send(dnsResponse);
                }
            }
        }
    } catch (e) {
        console.error(`DNS处理错误: ${e}`);
    } finally {
        try {
            WS接口.close(1000, 'DNS连接关闭');
        } catch (e) {
            console.error('关闭WebSocket时出错:', e);
        }
    }
}

function 验证VL的密钥(字节数组, 起始位置 = 0) {
    const 十六进制表 = Array.from({ length: 256 }, (_, 值) => (值 + 256).toString(16).slice(1));
    const 分段结构 = [4, 2, 2, 2, 6];
    let 当前索引 = 起始位置;
    const 格式化UUID = 分段结构
        .map(段长度 => Array.from({ length: 段长度 }, () => 十六进制表[字节数组[当前索引++]]).join(''))
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
    let 保活包计数 = 0;
    const 最大保活包 = 30;
    const 总数据阶梯延迟 = [
        { size: 1 * 1024 * 1024, delay: 100 },
        { size: 100 * 1024 * 1024, delay: 150 },
        { size: 200 * 1024 * 1024, delay: 200 },
    ];
    function 获取当前总延迟() {
        return (总数据阶梯延迟.slice().reverse().find(({ size }) => 累计接收字节数 >= size) ?? { delay: 300 }).delay;
    }

    WS接口.accept();

    // 伪装错误：在初始响应中发送错误消息但不关闭连接
    const 伪装条件 = Math.random() < 0.1 || 访问地址 === 'example.com';
    if (伪装条件) {
        console.log(`伪装错误触发: 地址=${访问地址}, 随机概率=${Math.random()}`);
        const 错误消息 = JSON.stringify({ error: '伪装的连接错误', code: 400 });
        WS接口.send(new TextEncoder().encode(错误消息));
    } else {
        WS接口.send(new Uint8Array([0, 0]));
    }

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

                    const 是Telegram = 保活域名名单.some(规则 => 匹配域名(访问地址, 规则));
                    if (启动控流机制 && !是Telegram && 访问地址 !== 'smtp.office365.com' && (累计接收字节数 - 字节计数) > 4*1024*1024) {
                        await new Promise(resolve => setTimeout(resolve, 获取当前总延迟() + 1000));
                        字节计数 = 累计接收字节数;
                    }
                } else if (保活域名名单.some(规则 => 匹配域名(访问地址, 规则))) {
                    console.log(`收到Telegram空包: ${访问地址}, 累计空包: ${++保活包计数}`);
                    if (保活包计数 >= 最大保活包) {
                        console.warn(`Telegram空包过多: ${访问地址}, 停止连接`);
                        await 清理资源();
                        break;
                    }
                }
            }
        } catch (err) {
            异常结束 = true;
            结束原因 = err?.stack || String(err);
            console.warn(`传输管道异常: ${访问地址}, 错误: ${结束原因}`);
            await 清理资源();
        }
    }

    async function 带超时读取(读取数据) {
        const 是IP地址 = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$|^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(访问地址);
        const 是SMTP = 访问地址 === 'smtp.office365.com';
        const 是Telegram = 保活域名名单.some(规则 => 匹配域名(访问地址, 规则));
        const 超时时间 = 是SMTP ? 300000 : 是Telegram ? 5000 : (是IP地址 ? 3000 : 30000);
        return new Promise((resolve, reject) => {
            let 超时计时器;
            let 保活计时器;
            let 已启动保活 = false;
            const 清理计时器 = () => {
                clearTimeout(超时计时器);
                if (保活计时器) clearInterval(保活计时器);
            };
            超时计时器 = setTimeout(() => {
                if (是Telegram && !已启动保活) {
                    已启动保活 = true;
                    console.log(`启动Telegram保活: ${访问地址}`);
                    写入队列 = 写入队列.then(() => 传输数据.write(new Uint8Array(0))).catch();
                    回写队列 = 回写队列.then(() => WS接口.send(new Uint8Array(0))).catch();

                    保活计时器 = setInterval(() => {
                        if (保活包计数 >= 最大保活包) {
                            clearInterval(保活计时器);
                            return;
                        }
                        console.log(`发送Telegram保活包: ${访问地址}, 计数: ${++保活包计数}`);
                        写入队列 = 写入队列.then(() => 传输数据.write(new Uint8Array(0))).catch();
                        回写队列 = 回写队列.then(() => WS接口.send(new Uint8Array(0))).catch();
                    }, 5000);
                } else if (!是Telegram) {
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
            console.warn(`资源清理失败: ${访问地址}, 错误: ${e.message}`);
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
}

async function 创建SOCKS5接口(识别地址类型, 访问地址, 访问端口) {
    const { 账号, 密码, 地址, 端口 } = await 获取SOCKS5账号(我的SOCKS5账号);
    const 是Telegram = 保活域名名单.some(规则 => 匹配域名(访问地址, 规则));
    const 超时时间 = 是Telegram ? 1500 : 500;
    // 并发连接到SOCKS5服务器
    const SOCKS5接口 = await concurrentConnect(地址, 端口, 超时时间);
    try {
        await Promise.race([
            SOCKS5接口.opened,
            new Promise((_, reject) => setTimeout(() => reject(new Error('SOCKS5连接超时')), 超时时间))
        ]);
    } catch {
        SOCKS5接口.close();
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
    '*.t.me', 't.me',
    '*.telegram.org',
    '*.telegram.me',
    '*.telegra.ph',
    '*.cdn-telegram.org',
    'smtp.office365.com',
    '*.tdesktop.com',
    '*.telesco.pe',
    'telegram.org',
    '*.telegram.dog',
];

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