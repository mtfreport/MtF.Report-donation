// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const donationForm = document.getElementById('donationForm');
    const paymentInputs = document.querySelectorAll('input[name="paymentMethod"]');
    const qrCodeSection = document.getElementById('qrCodeSection');
    const wechatQR = document.getElementById('wechatQR');
    const alipayQR = document.getElementById('alipayQR');
    const wechatText = document.getElementById('wechatText');
    const alipayText = document.getElementById('alipayText');
    const bankInfoSection = document.getElementById('bankInfoSection');
    const amountSelection = document.getElementById('amountSelection');
    const amountInputs = document.querySelectorAll('input[name="amount"]');
    const customAmountDiv = document.getElementById('customAmount');
    const customAmountInput = document.getElementById('customAmountInput');
    const frequencyInputs = document.querySelectorAll('input[name="frequency"]');
    const summaryAmount = document.getElementById('summaryAmount');
    const summaryFrequency = document.getElementById('summaryFrequency');
    const summaryTotal = document.getElementById('summaryTotal');
    const donateButton = document.querySelector('.donate-button');
    const buttonText = document.getElementById('buttonText');

    // 当前选择的金额、频率和支付方式
    let currentAmount = 0;
    let currentFrequency = '';
    let currentPaymentMethod = '';

    // 初始化 - 页面首次打开时隐藏所有相关区域
    initializePage();
    updateSummary();

    // 监听支付方式选择
    paymentInputs.forEach(input => {
        input.addEventListener('change', function() {
            currentPaymentMethod = this.value;
            handlePaymentMethodChange();
        });
    });

    // 页面初始化
    function initializePage() {
        // 获取需要控制的元素
        const donorInfo = document.querySelector('.donor-info');
        const donationFrequency = document.querySelector('.donation-frequency');
        const donationSummary = document.querySelector('.donation-summary');
        
        // 页面首次打开时隐藏所有相关区域
        qrCodeSection.style.display = 'none';
        wechatQR.style.display = 'none';
        alipayQR.style.display = 'none';
        wechatText.style.display = 'none';
        alipayText.style.display = 'none';
        bankInfoSection.style.display = 'none';
        amountSelection.style.display = 'none';
        donorInfo.style.display = 'none';
        donationFrequency.style.display = 'none';
        donationSummary.style.display = 'none';
        
        // 设置按钮文本
        buttonText.textContent = '选择支付方式';
    }

    // 处理支付方式变化
    function handlePaymentMethodChange() {
        // 获取需要控制的元素
        const donorInfo = document.querySelector('.donor-info');
        const donationFrequency = document.querySelector('.donation-frequency');
        const donationSummary = document.querySelector('.donation-summary');
        
        // 隐藏所有区域
        qrCodeSection.style.display = 'none';
        wechatQR.style.display = 'none';
        alipayQR.style.display = 'none';
        wechatText.style.display = 'none';
        alipayText.style.display = 'none';
        bankInfoSection.style.display = 'none';

        if (currentPaymentMethod === 'wechat') {
            // 显示微信二维码，隐藏金额选择和个人信息
            qrCodeSection.style.display = 'block';
            wechatQR.style.display = 'block';
            wechatText.style.display = 'block';
            amountSelection.style.display = 'none';
            donorInfo.style.display = 'none';
            donationFrequency.style.display = 'none';
            donationSummary.style.display = 'none';
            buttonText.textContent = '感谢你的捐赠';
            updateSummary();
        } else if (currentPaymentMethod === 'alipay') {
            // 显示支付宝二维码，隐藏金额选择和个人信息
            qrCodeSection.style.display = 'block';
            alipayQR.style.display = 'block';
            alipayText.style.display = 'block';
            amountSelection.style.display = 'none';
            donorInfo.style.display = 'none';
            donationFrequency.style.display = 'none';
            donationSummary.style.display = 'none';
            buttonText.textContent = '感谢你的捐赠';
            updateSummary();
        } else if (currentPaymentMethod === 'paypal') {
            // 显示金额选择和个人信息，隐藏二维码
            qrCodeSection.style.display = 'none';
            amountSelection.style.display = 'block';
            donorInfo.style.display = 'block';
            donationFrequency.style.display = 'block';
            donationSummary.style.display = 'block';
            buttonText.textContent = '跳转PayPal支付';
            
            // 清除默认选中的金额和频率选项
            amountInputs.forEach(input => input.checked = false);
            frequencyInputs.forEach(input => input.checked = false);
            customAmountDiv.style.display = 'none';
            customAmountInput.value = '';
            
            // 重置当前值
            currentAmount = 0;
            currentFrequency = '';
            
            updateSummary();
        } else if (currentPaymentMethod === 'bank') {
            // 显示银行卡信息，隐藏其他区域
            bankInfoSection.style.display = 'block';
            amountSelection.style.display = 'none';
            donorInfo.style.display = 'none';
            donationFrequency.style.display = 'none';
            donationSummary.style.display = 'none';
            buttonText.textContent = '确认银行卡转账';
            updateSummary();
        } else {
            // 没有选择支付方式，隐藏所有区域（回到初始状态）
            qrCodeSection.style.display = 'none';
            wechatQR.style.display = 'none';
            alipayQR.style.display = 'none';
            bankInfoSection.style.display = 'none';
            amountSelection.style.display = 'none';
            donorInfo.style.display = 'none';
            donationFrequency.style.display = 'none';
            donationSummary.style.display = 'none';
            buttonText.textContent = '选择支付方式';
            updateSummary();
        }
    }

    // 监听金额选择
    amountInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value === 'custom') {
                customAmountDiv.style.display = 'block';
                customAmountInput.focus();
                currentAmount = parseInt(customAmountInput.value) || 0;
            } else {
                customAmountDiv.style.display = 'none';
                currentAmount = parseInt(this.value);
            }
            updateSummary();
        });
    });

    // 监听自定义金额输入
    customAmountInput.addEventListener('input', function() {
        if (document.querySelector('input[name="amount"]:checked').value === 'custom') {
            currentAmount = parseInt(this.value) || 0;
            updateSummary();
        }
    });

    // 监听捐款频率选择
    frequencyInputs.forEach(input => {
        input.addEventListener('change', function() {
            currentFrequency = this.value;
            updateSummary();
        });
    });

    // 更新捐款摘要
    function updateSummary() {
        const amountText = currentAmount > 0 ? `¥${currentAmount.toLocaleString()}` : '请选择金额';
        const frequencyText = currentFrequency === 'one-time' ? '一次性捐款' : 
                             currentFrequency === 'monthly' ? '每月捐款' : '请选择频率';
        
        summaryAmount.textContent = amountText;
        summaryFrequency.textContent = frequencyText;
        summaryTotal.textContent = currentAmount > 0 ? `¥${currentAmount.toLocaleString()}` : '¥0';

        // 更新按钮状态
        if (currentPaymentMethod === 'paypal') {
            donateButton.disabled = currentAmount <= 0;
        } else {
            donateButton.disabled = !currentPaymentMethod;
        }
    }

    // 重置表单
    function resetForm() {
        donationForm.reset();
        currentAmount = 0;
        currentFrequency = '';
        currentPaymentMethod = '';
        customAmountDiv.style.display = 'none';
        
        // 清除所有默认选中状态
        amountInputs.forEach(input => input.checked = false);
        frequencyInputs.forEach(input => input.checked = false);
        
        // 重置显示状态 - 回到初始状态
        qrCodeSection.style.display = 'none';
        wechatQR.style.display = 'none';
        alipayQR.style.display = 'none';
        wechatText.style.display = 'none';
        alipayText.style.display = 'none';
        bankInfoSection.style.display = 'none';
        amountSelection.style.display = 'none';
        
        // 隐藏所有区域
        const donorInfo = document.querySelector('.donor-info');
        const donationFrequency = document.querySelector('.donation-frequency');
        const donationSummary = document.querySelector('.donation-summary');
        
        if (donorInfo) donorInfo.style.display = 'none';
        if (donationFrequency) donationFrequency.style.display = 'none';
        if (donationSummary) donationSummary.style.display = 'none';
        
        // 重置按钮文本
        buttonText.textContent = '选择支付方式';
        
        updateSummary();
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 表单验证
    function validateForm() {
        if (!currentPaymentMethod) {
            showMessage('请选择支付方式', 'error');
            return false;
        }
        
        // 对于微信和支付宝支付，不需要验证个人信息
        if (currentPaymentMethod === 'wechat' || currentPaymentMethod === 'alipay') {
            return true;
        }
        
        // 对于PayPal支付，需要验证个人信息和金额
        const firstName = document.getElementById('firstName').value.trim();
        const email = document.getElementById('email').value.trim();
        
        if (!firstName) {
            showMessage('请输入您的姓名', 'error');
            return false;
        }
        
        if (!email) {
            showMessage('请输入您的邮箱地址', 'error');
            return false;
        }
        
        if (!isValidEmail(email)) {
            showMessage('请输入有效的邮箱地址', 'error');
            return false;
        }
        
        if (currentAmount <= 0) {
            showMessage('请选择捐款金额', 'error');
            return false;
        }
        
        return true;
    }

    // 邮箱验证
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 显示消息
    function showMessage(message, type = 'success') {
        // 移除之前的消息
        const existingMessage = document.querySelector('.success-message, .error-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // 创建新消息
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        messageDiv.textContent = message;

        // 插入到表单顶部
        const form = document.getElementById('donationForm');
        form.insertBefore(messageDiv, form.firstChild);

        // 自动移除消息
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // 处理表单提交
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // 显示加载状态
        const originalText = donateButton.innerHTML;
        const originalButtonText = buttonText.textContent;
        donateButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 处理中...';
        donateButton.disabled = true;

        // 收集表单数据
        let formData = {
            paymentMethod: currentPaymentMethod,
            timestamp: new Date().toISOString()
        };
        
        // 根据支付方式收集不同的数据
        if (currentPaymentMethod === 'paypal') {
            formData = {
                ...formData,
                amount: currentAmount,
                frequency: currentFrequency,
                firstName: document.getElementById('firstName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                message: document.getElementById('message').value.trim()
            };
        } else {
            // 微信/支付宝支付，不收集个人信息
            formData = {
                ...formData,
                amount: '扫码支付',
                frequency: '一次性捐款'
            };
        }

        // 根据支付方式处理
        if (currentPaymentMethod === 'paypal') {
            // PayPal支付 - 跳转到PayPal
            showMessage('正在跳转到PayPal支付页面...', 'success');
            setTimeout(() => {
                // 这里应该跳转到实际的PayPal支付页面
                window.open('https://www.paypal.com/donate/?hosted_button_id=YOUR_BUTTON_ID', '_blank');
                
                // 模拟成功响应
                showMessage('感谢您的捐款！我们将通过邮件发送捐款确认。', 'success');
                resetForm();
            }, 1500);
        } else {
            // 微信/支付宝支付 - 模拟成功
            setTimeout(() => {
                console.log('捐款数据:', formData);
                
                // 模拟成功响应
                showMessage('感谢您的捐款！请完成扫码支付，我们将通过邮件发送捐款确认。', 'success');
                
                // 重置表单
                resetForm();
                
            }, 2000);
        }
        
        // 恢复按钮状态
        donateButton.innerHTML = originalText;
        buttonText.textContent = originalButtonText;
        donateButton.disabled = false;
    });

    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 添加数字动画效果
    function animateNumbers() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
            const suffix = stat.textContent.replace(/[\d,]/g, '');
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current).toLocaleString() + suffix;
            }, 30);
        });
    }

    // 监听滚动以触发数字动画
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }

    // 添加表单字段焦点效果
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // 添加键盘导航支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.matches('input[type="radio"]')) {
            e.target.checked = true;
            e.target.dispatchEvent(new Event('change'));
        }
    });

    // 添加移动端优化
    if ('ontouchstart' in window) {
        // 为移动设备添加触摸反馈
        const touchElements = document.querySelectorAll('.amount-button, .frequency-button, .donate-button');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }

    // 添加无障碍支持
    document.querySelectorAll('input, textarea').forEach(input => {
        if (!input.id) {
            input.id = 'input-' + Math.random().toString(36).substr(2, 9);
        }
    });

    // 添加错误处理
    window.addEventListener('error', function(e) {
        console.error('页面错误:', e.error);
        showMessage('页面出现错误，请刷新页面重试', 'error');
    });

    // 添加性能监控
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('页面加载时间:', loadTime + 'ms');
        });
    }
});

// 添加全局工具函数
window.MtFReport = {
    // 格式化金额
    formatAmount: function(amount) {
        return '¥' + amount.toLocaleString();
    },
    
    // 验证手机号
    validatePhone: function(phone) {
        const phoneRegex = /^1[3-9]\d{9}$/;
        return phoneRegex.test(phone);
    },
    
    // 生成捐款ID
    generateDonationId: function() {
        return 'DON-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
};

// 复制银行账号功能
function copyBankAccount() {
    const bankAccount = '0000 0000 0000 0000';
    
    // 使用现代浏览器的 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(bankAccount).then(() => {
            showCopySuccess();
        }).catch(err => {
            console.error('复制失败:', err);
            fallbackCopy(bankAccount);
        });
    } else {
        // 降级方案
        fallbackCopy(bankAccount);
    }
}

// 降级复制方案
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        console.error('复制失败:', err);
        showCopyError();
    }
    
    document.body.removeChild(textArea);
}

// 显示复制成功消息
function showCopySuccess() {
    const copyBtn = document.querySelector('.copy-btn');
    const originalText = copyBtn.innerHTML;
    
    copyBtn.innerHTML = '<i class="fas fa-check"></i> 已复制';
    copyBtn.style.background = 'var(--success-color)';
    
    setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.background = '';
    }, 2000);
}

// 显示复制失败消息
function showCopyError() {
    const copyBtn = document.querySelector('.copy-btn');
    const originalText = copyBtn.innerHTML;
    
    copyBtn.innerHTML = '<i class="fas fa-times"></i> 复制失败';
    copyBtn.style.background = '#ef4444';
    
    setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.background = '';
    }, 2000);
} 