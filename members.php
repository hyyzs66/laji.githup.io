<?php
// 成员列表管理

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// 处理OPTIONS请求
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 成员列表
$members = [
    '黄鹏文',
    '徐鑫鹏',
    '王金涛',
    '黄孝傲',
    '冉墙林',
    '黄永鑫'
];

echo json_encode($members);
?>