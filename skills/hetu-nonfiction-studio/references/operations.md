# 操作地图

由正式清单生成，执行前发现当前安装版Schema。

| 动作 | 用途 | 必填参数 | 效果 |
| --- | --- | --- | --- |
| list_projects | 查找歌词工程 |  | read |
| get_project | 读取固定歌词工程 | object_id | read |
| save_project | 保存完整歌词工程 | expected_revision, expected_sha256, operation_key, content | managed_write |
| get_source | 分块读取固定来源 | object_id, source_index | read |
| get_basis | 读取固定专业依据 | object_id, basis_index | read |
| compare_versions | 比较固定歌词修订 | object_id, from_revision, to_revision | read |
| export_project | 分块导出完整歌词数据 | object_id, format | read |
| build_context | 准备有界创作上下文 | object_id, goal, max_chars | read |
| create_handoff | 准备本工程AI接续 | object_id, goal | read |
| get_operation | 回读原操作 | operation_key | read |
| put_card | 维护来源说明 | object_id, expected_revision, expected_sha256, operation_key, card | managed_write |
| remove_card | 移除来源说明 | object_id, expected_revision, expected_sha256, operation_key, card_id | managed_write |
| put_evidence | 维护固定证据 | object_id, expected_revision, expected_sha256, operation_key, evidence | managed_write |
| put_turn | 维护采访原话 | object_id, expected_revision, expected_sha256, operation_key, turn | managed_write |
| put_block | 维护文章段落 | object_id, expected_revision, expected_sha256, operation_key, block | managed_write |
| remove_block | 移除文章段落 | object_id, expected_revision, expected_sha256, operation_key, block_id | managed_write |
| put_claim | 维护文章主张 | object_id, expected_revision, expected_sha256, operation_key, claim | managed_write |
| remove_claim | 移除文章主张 | object_id, expected_revision, expected_sha256, operation_key, claim_id | managed_write |
| put_link | 维护证据关系 | object_id, expected_revision, expected_sha256, operation_key, link | managed_write |
| remove_link | 移除证据关系 | object_id, expected_revision, expected_sha256, operation_key, link_id | managed_write |
| put_assessment | 维护核实记录 | object_id, expected_revision, expected_sha256, operation_key, assessment | managed_write |
| put_note | 维护固定意见 | object_id, expected_revision, expected_sha256, operation_key, note | managed_write |
| remove_note | 移除固定意见 | object_id, expected_revision, expected_sha256, operation_key, note_id | managed_write |
| target_digest | 读取固定目标摘要 | object_id, target_kind, target_id | read |
| check_nonfiction | 检查纪实核实缺口 | object_id | read |
| claim_report | 读取主张与核实 | object_id | read |
| evidence_report | 读取证据与反证 | object_id | read |
| interview_view | 读取采访原话 | object_id | read |
| article_view | 读取文章结构 | object_id | read |
| citation_list | 读取实际引用清单 | object_id | read |
| claim_digest | 读取主张及证据组合摘要 | object_id, claim_id | read |
| export_article | 导出专业阅读本 | object_id | read |
| export_review | 导出完整专业审核本 | object_id | read |
