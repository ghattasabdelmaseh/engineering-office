// العناصر الرئيسية
const navButtons = document.querySelectorAll('.nav-btn');
const contentSections = document.querySelectorAll('.content-section');
const currentDateEl = document.getElementById('current-date');

// تهيئة التاريخ
function initDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    currentDateEl.textContent = now.toLocaleDateString('ar-EG', options);
}

// تبديل الأقسام
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // إزالة التنشيط من جميع الأزرار
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        // تنشيط الزر الحالي
        button.classList.add('active');
        
        // إخفاء جميع الأقسام
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // إظهار القسم المحدد
        const sectionId = button.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
    });
});

// جدول محاضر الاستلام
const inspectionTable = document.getElementById('inspection-table');
const addInspectionRowBtn = document.getElementById('add-inspection-row');

function addInspectionRow() {
    const rowCount = inspectionTable.rows.length;
    const row = inspectionTable.insertRow();
    
    row.innerHTML = `
        <td>${rowCount}</td>
        <td><input type="text" placeholder="اسم البند"></td>
        <td><input type="number" placeholder="الكمية"></td>
        <td><input type="text" placeholder="المواصفات"></td>
    `;
}

addInspectionRowBtn.addEventListener('click', addInspectionRow);

// جدول الكميات (BOQ)
const boqTable = document.getElementById('boq-table');
const exportExcelBtn = document.getElementById('export-excel');

function addBOQRow() {
    const rowCount = boqTable.rows.length;
    const row = boqTable.insertRow();
    
    row.innerHTML = `
        <td>${rowCount}</td>
        <td><input type="text" placeholder="وصف البند"></td>
        <td><input type="text" placeholder="الوحدة"></td>
        <td><input type="number" class="quantity" placeholder="0"></td>
        <td><input type="number" class="unit-price" placeholder="0"></td>
        <td class="total">0.00</td>
    `;
    
    // إضافة مستمعين للأحداث لحساب الإجمالي
    const quantityInput = row.querySelector('.quantity');
    const priceInput = row.querySelector('.unit-price');
    
    function calculateRowTotal() {
        const quantity = parseFloat(quantityInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;
        const totalCell = row.querySelector('.total');
        totalCell.textContent = (quantity * price).toFixed(2);
    }
    
    quantityInput.addEventListener('input', calculateRowTotal);
    priceInput.addEventListener('input', calculateRowTotal);
}

// تصدير إلى Excel
exportExcelBtn.addEventListener('click', () => {
    // يمكنك استخدام مكتبة SheetJS هنا
    alert('سيتم تطوير هذه الوظيفة لاحقاً');
});

// تهيئة التطبيق
function initApp() {
    initDate();
    // إضافة صفوف افتراضية
    addInspectionRow();
    addBOQRow();
}

document.addEventListener('DOMContentLoaded', initApp);
