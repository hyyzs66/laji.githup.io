<?php
// 交换申请管理

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// 处理OPTIONS请求
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 数据文件路径
$dataFile = 'data/swap_requests.json';

// 确保数据目录存在
if (!file_exists('data')) {
    mkdir('data', 0777, true);
}

// 默认交换申请数据
$defaultRequests = [
    [
        'id' => 1,
        'from' => '黄鹏文',
        'to' => '徐鑫鹏',
        'date' => '2024-05-20',
        'status' => 'pending'
    ],
    [
        'id' => 2,
        'from' => '王金涛',
        'to' => '黄孝傲',
        'date' => '2024-05-22',
        'status' => 'pending'
    ]
];

// 初始化数据文件（如果不存在）
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode($defaultRequests));
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // 获取交换申请
        $requests = json_decode(file_get_contents($dataFile), true);
        echo json_encode($requests);
        break;
        
    case 'POST':
        // 添加新的交换申请
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (isset($input['from']) && isset($input['to']) && isset($input['date'])) {
            $requests = json_decode(file_get_contents($dataFile), true);
            
            // 生成新的ID
            $newId = 1;
            if (!empty($requests)) {
                $maxId = max(array_column($requests, 'id'));
                $newId = $maxId + 1;
            }
            
            $newRequest = [
                'id' => $newId,
                'from' => $input['from'],
                'to' => $input['to'],
                'date' => $input['date'],
                'status' => 'pending'
            ];
            
            $requests[] = $newRequest;
            
            file_put_contents($dataFile, json_encode($requests));
            echo json_encode(['success' => true, 'request' => $newRequest]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Missing required parameters']);
        }
        break;
        
    case 'PUT':
        // 更新交换申请状态
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (isset($input['id']) && isset($input['status'])) {
            $requests = json_decode(file_get_contents($dataFile), true);
            
            $updated = false;
            foreach ($requests as &$request) {
                if ($request['id'] == $input['id']) {
                    $request['status'] = $input['status'];
                    $updated = true;
                    break;
                }
            }
            
            if ($updated) {
                file_put_contents($dataFile, json_encode($requests));
                echo json_encode(['success' => true, 'requests' => $requests]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Request not found']);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'Missing id or status parameter']);
        }
        break;
        
    case 'DELETE':
        // 删除交换申请
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (isset($input['id'])) {
            $requests = json_decode(file_get_contents($dataFile), true);
            
            $newRequests = array_filter($requests, function($request) use ($input) {
                return $request['id'] != $input['id'];
            });
            
            // 重新索引数组
            $newRequests = array_values($newRequests);
            
            file_put_contents($dataFile, json_encode($newRequests));
            echo json_encode(['success' => true, 'requests' => $newRequests]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Missing id parameter']);
        }
        break;
        
    default:
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
}
?>