# MtF.Report 捐款页面

这是一个为MtF.Report项目设计的现代化捐款页面，支持多种支付方式。

## 功能特性

### 支付方式
- **微信支付**: 显示二维码，用户扫码支付
- **支付宝**: 显示二维码，用户扫码支付  
- **PayPal**: 跳转到PayPal支付页面

### 捐款流程
1. **选择支付方式**: 用户首先选择支付方式
2. **金额选择**: 
   - 微信/支付宝：跳过金额选择，直接显示二维码
   - PayPal：需要选择具体金额
3. **填写信息**: 用户填写个人信息
4. **完成支付**: 根据支付方式进行相应处理

### 用户体验
- 响应式设计，支持移动端
- 现代化的UI设计
- 实时表单验证
- 平滑的动画效果
- 无障碍访问支持

## 技术栈
- HTML5
- CSS3 (使用CSS变量和Flexbox/Grid布局)
- JavaScript (ES6+)
- Font Awesome 图标
- Google Fonts (Inter字体)

## 文件结构
```
MtF.Report-donation/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # JavaScript逻辑
└── README.md           # 项目说明
```

## 使用方法
1. 克隆或下载项目文件
2. 在项目目录中启动本地服务器：
   ```bash
   python3 -m http.server 8000
   ```
3. 在浏览器中访问 `http://localhost:8000`

## 自定义配置
- 修改二维码图片：替换HTML中的placeholder图片链接
- 修改PayPal按钮ID：在script.js中更新`YOUR_BUTTON_ID`
- 自定义样式：修改styles.css中的CSS变量

## 浏览器支持
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 许可证
本项目采用GPL v3许可证。 
