<?php
// 倒垃圾次数统计管理

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// 处理OPTIONS请求
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 数据文件路径
$dataFile = 'data/duty_stats.json';

// 确保数据目录存在
if (!file_exists('data')) {
    mkdir('data', 0777, true);
}

// 默认统计数据
$defaultStats = [
    '黄鹏文' => 8,
    '徐鑫鹏' => 7,
    '王金涛' => 8,
    '黄孝傲' => 7,
    '冉墙林' => 8,
    '黄永鑫' => 7
];

// 初始化数据文件（如果不存在）
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode($defaultStats));
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // 获取统计数据
        $stats = json_decode(file_get_contents($dataFile), true);
        echo json_encode($stats);
        break;
        
    case 'POST':
        // 更新统计数据
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (isset($input['member'])) {
            $stats = json_decode(file_get_contents($dataFile), true);
            $member = $input['member'];
            
            if (!isset($stats[$member])) {
                $stats[$member] = 0;
            }
            
            $stats[$member]++;
            
            file_put_contents($dataFile, json_encode($stats));
            echo json_encode(['success' => true, 'count' => $stats[$member]]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Missing member parameter']);
        }
        break;
        
    case 'PUT':
        // 设置统计数据
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (is_array($input)) {
            file_put_contents($dataFile, json_encode($input));
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Invalid data format']);
        }
        break;
        
    default:
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
}
?>