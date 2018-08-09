//insert template_img table(template image url)
exports.upTmplImgCol = [
  "template_id", "url", "created_at"
];

//insert ctrit_templates table(template profile url)
exports.upTmplCol = [
  "title", "description", "template_url", "created_at"
];

//update ctrit_templates table(template file url)
exports.upTmplICol = [
  "url", "created_at"
]

//insert activity_category(category image url)
exports.upCateCol = [
  "category_name", "url", "created_at"
];

//insert ref_prj_files table(file url)
exports.upPrjCol = [
  "prj_id", "url", "file_type", "approval", "size_type", "created_at"
];

//modified users table(image url)
exports.upUsersCol = [
  "url", "modified_at"
];

//insert ref_cont_file table(content file url)
exports.upContCol = [
  "play_id", "url", "created_at"
];
