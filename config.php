<?php
// 配置信息管理

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// 处理OPTIONS请求
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 数据文件路径
$dataFile = 'data/config.json';

// 确保数据目录存在
if (!file_exists('data')) {
    mkdir('data', 0777, true);
}

// 默认配置
$defaultConfig = [
    'start_date' => '2024-01-01'
];

// 初始化数据文件（如果不存在）
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode($defaultConfig));
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // 获取配置信息
        $config = json_decode(file_get_contents($dataFile), true);
        echo json_encode($config);
        break;
        
    case 'POST':
    case 'PUT':
        // 更新配置信息
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (is_array($input)) {
            // 合并现有配置和新配置
            $currentConfig = json_decode(file_get_contents($dataFile), true);
            $newConfig = array_merge($currentConfig, $input);
            
            file_put_contents($dataFile, json_encode($newConfig));
            echo json_encode(['success' => true, 'config' => $newConfig]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Invalid data format']);
        }
        break;
        
    default:
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
}
?>