/**
 * 数据管理模块
 * 用于处理系统中各种数据的读写操作
 */

class DataManager {
    /**
     * 读取成员列表
     */
    static async loadMembers() {
        try {
            const response = await fetch('members.txt');
            const text = await response.text();
            return text.trim().split('\n').filter(member => member.trim() !== '');
        } catch (error) {
            console.error('读取成员列表失败:', error);
            return ['黄鹏文', '徐鑫鹏', '王金涛', '黄孝傲', '冉墙林', '黄永鑫']; // 默认成员
        }
    }

    /**
     * 读取倒垃圾次数统计
     */
    static async loadDutyStats() {
        try {
            const response = await fetch('duty_stats.txt');
            const text = await response.text();
            const stats = {};
            text.trim().split('\n').forEach(line => {
                const [member, count] = line.split(':');
                if (member && count) {
                    stats[member] = parseInt(count);
                }
            });
            return stats;
        } catch (error) {
            console.error('读取倒垃圾次数统计失败:', error);
            return {}; // 默认为空
        }
    }

    /**
     * 保存倒垃圾次数统计
     */
    static async saveDutyStats(stats) {
        try {
            let content = '';
            for (const [member, count] of Object.entries(stats)) {
                content += `${member}:${count}\n`;
            }
            await DataManager.saveToFile('duty_stats.txt', content);
            return true;
        } catch (error) {
            console.error('保存倒垃圾次数统计失败:', error);
            return false;
        }
    }

    /**
     * 读取假期设置
     */
    static async loadHolidays() {
        try {
            const response = await fetch('holidays.txt');
            const text = await response.text();
            const holidays = [];
            text.trim().split('\n').forEach(line => {
                const [start, end] = line.split(',');
                if (start && end) {
                    holidays.push({ start, end });
                }
            });
            return holidays;
        } catch (error) {
            console.error('读取假期设置失败:', error);
            return []; // 默认为空
        }
    }

    /**
     * 保存假期设置
     */
    static async saveHolidays(holidays) {
        try {
            let content = '';
            holidays.forEach(holiday => {
                content += `${holiday.start},${holiday.end}\n`;
            });
            await DataManager.saveToFile('holidays.txt', content);
            return true;
        } catch (error) {
            console.error('保存假期设置失败:', error);
            return false;
        }
    }

    /**
     * 读取交换申请
     */
    static async loadSwapRequests() {
        try {
            const response = await fetch('swap_requests.txt');
            const text = await response.text();
            const requests = [];
            text.trim().split('\n').forEach(line => {
                const [id, from, to, date, status] = line.split(',');
                if (id && from && to && date && status) {
                    requests.push({ 
                        id: parseInt(id), 
                        from, 
                        to, 
                        date, 
                        status 
                    });
                }
            });
            return requests;
        } catch (error) {
            console.error('读取交换申请失败:', error);
            return []; // 默认为空
        }
    }

    /**
     * 保存交换申请
     */
    static async saveSwapRequests(requests) {
        try {
            let content = '';
            requests.forEach(request => {
                content += `${request.id},${request.from},${request.to},${request.date},${request.status}\n`;
            });
            await DataManager.saveToFile('swap_requests.txt', content);
            return true;
        } catch (error) {
            console.error('保存交换申请失败:', error);
            return false;
        }
    }

    /**
     * 读取配置信息
     */
    static async loadConfig() {
        try {
            const response = await fetch('config.txt');
            const text = await response.text();
            const config = {};
            text.trim().split('\n').forEach(line => {
                const [key, value] = line.split(':');
                if (key && value) {
                    config[key] = value;
                }
            });
            return config;
        } catch (error) {
            console.error('读取配置信息失败:', error);
            return {}; // 默认为空
        }
    }

    /**
     * 通用保存文件方法
     */
    static async saveToFile(filename, content) {
        // 注意：由于浏览器安全限制，不能直接写入文件
        // 在实际部署时，这里需要替换为后端API调用
        console.warn(`保存到文件 ${filename} 的操作在浏览器环境中不可用，需要后端支持`);
        console.log(`文件内容:\n${content}`);
        // 这里只是模拟保存操作
        return true;
    }

    /**
     * 添加新的交换申请
     */
    static async addSwapRequest(from, to, date) {
        try {
            const requests = await DataManager.loadSwapRequests();
            const newId = requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1;
            const newRequest = {
                id: newId,
                from: from,
                to: to,
                date: date,
                status: 'pending'
            };
            requests.push(newRequest);
            return await DataManager.saveSwapRequests(requests);
        } catch (error) {
            console.error('添加交换申请失败:', error);
            return false;
        }
    }

    /**
     * 更新交换申请状态
     */
    static async updateSwapRequestStatus(id, status) {
        try {
            const requests = await DataManager.loadSwapRequests();
            const request = requests.find(r => r.id === id);
            if (request) {
                request.status = status;
                return await DataManager.saveSwapRequests(requests);
            }
            return false;
        } catch (error) {
            console.error('更新交换申请状态失败:', error);
            return false;
        }
    }

    /**
     * 增加成员倒垃圾次数
     */
    static async incrementDutyCount(member) {
        try {
            const stats = await DataManager.loadDutyStats();
            stats[member] = (stats[member] || 0) + 1;
            return await DataManager.saveDutyStats(stats);
        } catch (error) {
            console.error('增加倒垃圾次数失败:', error);
            return false;
        }
    }
}