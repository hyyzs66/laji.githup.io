<?php
// 假期设置管理

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// 处理OPTIONS请求
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 数据文件路径
$dataFile = 'data/holidays.json';

// 确保数据目录存在
if (!file_exists('data')) {
    mkdir('data', 0777, true);
}

// 默认假期数据
$defaultHolidays = [
    ['start' => '2024-01-01', 'end' => '2024-02-01'],
    ['start' => '2024-05-01', 'end' => '2024-05-03']
];

// 初始化数据文件（如果不存在）
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode($defaultHolidays));
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // 获取假期设置
        $holidays = json_decode(file_get_contents($dataFile), true);
        echo json_encode($holidays);
        break;
        
    case 'POST':
        // 添加新的假期
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (isset($input['start']) && isset($input['end'])) {
            $holidays = json_decode(file_get_contents($dataFile), true);
            
            // 检查是否已存在相同的假期
            $exists = false;
            foreach ($holidays as $holiday) {
                if ($holiday['start'] === $input['start'] && $holiday['end'] === $input['end']) {
                    $exists = true;
                    break;
                }
            }
            
            if (!$exists) {
                $holidays[] = [
                    'start' => $input['start'],
                    'end' => $input['end']
                ];
                
                file_put_contents($dataFile, json_encode($holidays));
                echo json_encode(['success' => true, 'holidays' => $holidays]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Holiday already exists']);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'Missing start or end date']);
        }
        break;
        
    case 'DELETE':
        // 删除假期
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (isset($input['start']) && isset($input['end'])) {
            $holidays = json_decode(file_get_contents($dataFile), true);
            
            // 查找并删除匹配的假期
            $newHolidays = [];
            foreach ($holidays as $holiday) {
                if ($holiday['start'] !== $input['start'] || $holiday['end'] !== $input['end']) {
                    $newHolidays[] = $holiday;
                }
            }
            
            file_put_contents($dataFile, json_encode($newHolidays));
            echo json_encode(['success' => true, 'holidays' => $newHolidays]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Missing start or end date']);
        }
        break;
        
    default:
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
}
?>