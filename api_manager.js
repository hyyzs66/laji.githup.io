/**
 * API管理模块
 * 用于处理与PHP后端的通信
 */

class ApiManager {
    /**
     * 获取成员列表
     */
    static async loadMembers() {
        try {
            const response = await fetch('members.php');
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to load members');
            }
        } catch (error) {
            console.error('获取成员列表失败:', error);
            // 返回默认成员列表
            return ['黄鹏文', '徐鑫鹏', '王金涛', '黄孝傲', '冉墙林', '黄永鑫'];
        }
    }

    /**
     * 获取倒垃圾次数统计
     */
    static async loadDutyStats() {
        try {
            const response = await fetch('duty_stats.php');
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to load duty stats');
            }
        } catch (error) {
            console.error('获取倒垃圾次数统计失败:', error);
            return {}; // 返回空对象
        }
    }

    /**
     * 增加成员倒垃圾次数
     */
    static async incrementDutyCount(member) {
        try {
            const response = await fetch('duty_stats.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ member: member })
            });
            
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to increment duty count');
            }
        } catch (error) {
            console.error('增加倒垃圾次数失败:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 设置倒垃圾次数统计
     */
    static async setDutyStats(stats) {
        try {
            const response = await fetch('duty_stats.php', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(stats)
            });
            
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to set duty stats');
            }
        } catch (error) {
            console.error('设置倒垃圾次数统计失败:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 获取假期设置
     */
    static async loadHolidays() {
        try {
            const response = await fetch('holidays.php');
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to load holidays');
            }
        } catch (error) {
            console.error('获取假期设置失败:', error);
            return []; // 返回空数组
        }
    }

    /**
     * 添加假期
     */
    static async addHoliday(start, end) {
        try {
            const response = await fetch('holidays.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ start: start, end: end })
            });
            
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to add holiday');
            }
        } catch (error) {
            console.error('添加假期失败:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 删除假期
     */
    static async removeHoliday(start, end) {
        try {
            const response = await fetch('holidays.php', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ start: start, end: end })
            });
            
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to remove holiday');
            }
        } catch (error) {
            console.error('删除假期失败:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 获取交换申请
     */
    static async loadSwapRequests() {
        try {
            const response = await fetch('swap_requests.php');
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to load swap requests');
            }
        } catch (error) {
            console.error('获取交换申请失败:', error);
            return []; // 返回空数组
        }
    }

    /**
     * 添加交换申请
     */
    static async addSwapRequest(from, to, date) {
        try {
            const response = await fetch('swap_requests.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ from: from, to: to, date: date })
            });
            
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to add swap request');
            }
        } catch (error) {
            console.error('添加交换申请失败:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 更新交换申请状态
     */
    static async updateSwapRequestStatus(id, status) {
        try {
            const response = await fetch('swap_requests.php', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, status: status })
            });
            
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to update swap request status');
            }
        } catch (error) {
            console.error('更新交换申请状态失败:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 删除交换申请
     */
    static async removeSwapRequest(id) {
        try {
            const response = await fetch('swap_requests.php', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })
            });
            
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to remove swap request');
            }
        } catch (error) {
            console.error('删除交换申请失败:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 获取配置信息
     */
    static async loadConfig() {
        try {
            const response = await fetch('config.php');
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to load config');
            }
        } catch (error) {
            console.error('获取配置信息失败:', error);
            return {}; // 返回空对象
        }
    }

    /**
     * 更新配置信息
     */
    static async updateConfig(config) {
        try {
            const response = await fetch('config.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(config)
            });
            
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to update config');
            }
        } catch (error) {
            console.error('更新配置信息失败:', error);
            return { success: false, error: error.message };
        }
    }
}