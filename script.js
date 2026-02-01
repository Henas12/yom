// script.js - Ethiopian Business Hub JavaScript

// ============================================
// DOM Content Loaded Event Listener
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Ethiopian Business Hub initialized');
    
    // Initialize all components
    initMobileMenu();
    initSmoothScrolling();
    initLanguageToggle();
    initBackToTop();
    initFilterControls();
    initCurrencyConverter();
    initJobFilters();
    initMarketplaceFilters();
    initContactForm();
    initNewsletterForm();
    
    // Load mock data
    loadMockData();
    
    // Update current year in footer
    updateCurrentYear();
    
    // Update Ethiopian date
    updateEthiopianDate();
});

// ============================================
// Mobile Menu Toggle
// ============================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!menuToggle || !mainNav) return;
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
        this.setAttribute('aria-expanded', this.classList.contains('active'));
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ============================================
// Language Toggle Functionality
// ============================================
function initLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Update active button
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // In a real implementation, this would change the site language
            console.log(`Language changed to: ${lang}`);
            alert(`Language would change to ${lang === 'am' ? 'Amharic' : 'English'} in a real implementation`);
        });
    });
}

// ============================================
// Back to Top Button
// ============================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Filter Controls for Prices
// ============================================
function initFilterControls() {
    const citySelect = document.getElementById('city-select');
    if (!citySelect) return;
    
    // Mock cities data
    const cities = [
        { id: 'addis', name: 'አዲስ አበባ' },
        { id: 'diredawa', name: 'ደሴ' },
        { id: 'hawassa', name: 'ሀዋሳ' },
        { id: 'bahirdar', name: 'ባህር ዳር' },
        { id: 'jimma', name: 'ጅማ' },
        { id: 'mekelle', name: 'መቀሌ' },
        { id: 'gonder', name: 'ጎንደር' },
        { id: 'adama', name: 'አዳማ' }
    ];
    
    // Add cities to select (skip first option which is "all")
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.id;
        option.textContent = city.name;
        citySelect.appendChild(option);
    });
    
    // Add event listener for filtering
    citySelect.addEventListener('change', function() {
        filterPriceTable(this.value);
    });
}

function filterPriceTable(cityId) {
    const tableRows = document.querySelectorAll('.prices-table tbody tr');
    
    tableRows.forEach(row => {
        if (cityId === 'all') {
            row.style.display = '';
        } else {
            // In a real implementation, this would filter by city
            // For now, we'll just show all rows
            row.style.display = '';
        }
    });
    
    console.log(`Filtering prices by city: ${cityId}`);
}

// ============================================
// Currency Converter
// ============================================
function initCurrencyConverter() {
    const amountInput = document.getElementById('amount-input');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const swapBtn = document.getElementById('swap-currencies');
    const convertBtn = document.getElementById('convert-btn');
    const convertedAmount = document.getElementById('converted-amount');
    const conversionText = document.getElementById('conversion-text');
    
    if (!amountInput || !fromCurrency || !toCurrency) return;
    
    // Mock currency data
    const currencies = [
        { code: 'ETB', name: 'ኢትዮጵያ ብር', rate: 1, flag: '🇪🇹' },
        { code: 'USD', name: 'የአሜሪካ ዶላር', rate: 55.5, flag: '🇺🇸' },
        { code: 'EUR', name: 'ዩሮ', rate: 59.2, flag: '🇪🇺' },
        { code: 'GBP', name: 'የብሪታንያ ፓውንድ', rate: 68.3, flag: '🇬🇧' },
        { code: 'CAD', name: 'የካናዳ ዶላር', rate: 40.1, flag: '🇨🇦' },
        { code: 'AED', name: 'የአረብ ድርሀም', rate: 15.1, flag: '🇦🇪' },
        { code: 'CNY', name: 'የቻይና ዩዋን', rate: 7.6, flag: '🇨🇳' }
    ];
    
    // Populate currency selects
    currencies.forEach(currency => {
        const fromOption = document.createElement('option');
        fromOption.value = currency.code;
        fromOption.textContent = `${currency.code} - ${currency.name}`;
        fromOption.selected = currency.code === 'ETB';
        fromCurrency.appendChild(fromOption);
        
        const toOption = document.createElement('option');
        toOption.value = currency.code;
        toOption.textContent = `${currency.code} - ${currency.name}`;
        toOption.selected = currency.code === 'USD';
        toCurrency.appendChild(toOption);
    });
    
    // Populate currency cards
    const currencyGrid = document.querySelector('.currency-grid');
    if (currencyGrid) {
        currencies.forEach(currency => {
            if (currency.code === 'ETB') return; // Skip ETB as it's the base
            
            const change = (Math.random() * 2 - 1).toFixed(2);
            const changeClass = change >= 0 ? 'price-up' : 'price-down';
            const changeSymbol = change >= 0 ? '+' : '';
            
            const currencyCard = document.createElement('div');
            currencyCard.className = 'currency-card';
            currencyCard.innerHTML = `
                <div class="currency-flag">${currency.flag}</div>
                <div class="currency-code">${currency.code}</div>
                <div class="currency-name">${currency.name}</div>
                <div class="currency-rate">${currency.rate.toFixed(2)} ብር</div>
                <div class="currency-change ${changeClass}">${changeSymbol}${change}%</div>
            `;
            
            currencyGrid.appendChild(currencyCard);
        });
    }
    
    // Swap currencies
    swapBtn.addEventListener('click', function() {
        const fromValue = fromCurrency.value;
        const toValue = toCurrency.value;
        
        fromCurrency.value = toValue;
        toCurrency.value = fromValue;
        
        // Trigger conversion
        performConversion();
    });
    
    // Convert on button click
    convertBtn.addEventListener('click', performConversion);
    
    // Convert on input change
    amountInput.addEventListener('input', performConversion);
    fromCurrency.addEventListener('change', performConversion);
    toCurrency.addEventListener('change', performConversion);
    
    // Initial conversion
    performConversion();
    
    function performConversion() {
        const amount = parseFloat(amountInput.value) || 0;
        const fromCode = fromCurrency.value;
        const toCode = toCurrency.value;
        
        // Find currency rates
        const fromCurrencyData = currencies.find(c => c.code === fromCode);
        const toCurrencyData = currencies.find(c => c.code === toCode);
        
        if (!fromCurrencyData || !toCurrencyData) return;
        
        // Convert amount
        let result;
        if (fromCode === 'ETB') {
            // Converting from ETB to foreign currency
            result = amount / toCurrencyData.rate;
        } else if (toCode === 'ETB') {
            // Converting from foreign currency to ETB
            result = amount * fromCurrencyData.rate;
        } else {
            // Converting between two foreign currencies
            // First convert to ETB, then to target currency
            const amountInETB = amount * fromCurrencyData.rate;
            result = amountInETB / toCurrencyData.rate;
        }
        
        // Update converted amount field
        convertedAmount.value = result.toFixed(2);
        
        // Update conversion text
        const fromName = fromCurrencyData.name;
        const toName = toCurrencyData.name;
        conversionText.textContent = `${amount.toFixed(2)} ${fromCode} = ${result.toFixed(2)} ${toCode}`;
    }
}

// ============================================
// Job Filters
// ============================================
function initJobFilters() {
    const jobCategories = document.querySelector('.job-categories');
    const loadMoreBtn = document.getElementById('load-more-jobs');
    
    if (!jobCategories || !loadMoreBtn) return;
    
    // Mock job categories
    const categories = [
        { id: 'all', name: 'ሁሉም', count: 45 },
        { id: 'tech', name: 'ቴክኖሎጂ', count: 12 },
        { id: 'finance', name: 'ፋይናንስ', count: 8 },
        { id: 'marketing', name: 'ግብይት', count: 6 },
        { id: 'health', name: 'ጤና', count: 7 },
        { id: 'education', name: 'ትምህርት', count: 5 },
        { id: 'engineering', name: 'ኢንጂነሪንግ', count: 7 }
    ];
    
    // Populate job categories
    categories.forEach(category => {
        const categoryTag = document.createElement('div');
        categoryTag.className = 'category-tag';
        if (category.id === 'all') categoryTag.classList.add('active');
        categoryTag.setAttribute('data-category', category.id);
        categoryTag.textContent = `${category.name} (${category.count})`;
        
        categoryTag.addEventListener('click', function() {
            // Update active category
            document.querySelectorAll('.category-tag').forEach(tag => {
                tag.classList.remove('active');
            });
            this.classList.add('active');
            
            // Filter jobs
            filterJobsByCategory(this.getAttribute('data-category'));
        });
        
        jobCategories.appendChild(categoryTag);
    });
    
    // Load more jobs button
    loadMoreBtn.addEventListener('click', function() {
        // In a real implementation, this would load more jobs from an API
        alert('ተጨማሪ ስራዎች በመጫን ላይ... በእውነተኛ መተግበሪያ ይህ ተጨማሪ የስራ ዝርዝሮችን ያጫናል።');
        this.textContent = 'ማሳለፊያ ተጠናቋል';
        this.disabled = true;
    });
}

function filterJobsByCategory(categoryId) {
    console.log(`Filtering jobs by category: ${categoryId}`);
    // In a real implementation, this would filter job listings
}

// ============================================
// Marketplace Filters
// ============================================
function initMarketplaceFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const postListingBtn = document.getElementById('post-listing');
    
    if (!categoryBtns.length || !postListingBtn) return;
    
    // Category filter functionality
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter listings
            const category = this.getAttribute('data-category');
            filterListingsByCategory(category);
        });
    });
    
    // Post listing button
    postListingBtn.addEventListener('click', function() {
        alert('የማስታወቂያ ማስገቢያ ምሳሌ። በእውነተኛ መተግበሪያ፣ ይህ የማስታወቂያ ፎርምን ያሳያል።');
    });
}

function filterListingsByCategory(category) {
    console.log(`Filtering listings by category: ${category}`);
    // In a real implementation, this would filter marketplace listings
}

// ============================================
// Contact Form
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        
        // In a real implementation, this would send data to a server
        console.log('Contact form submitted:', { name, email });
        alert(`አመሰግናለሁ ${name}! መልእክትህን ተቀብለናል። በቅርቡ እንገናኝሃለን።`);
        
        // Reset form
        this.reset();
    });
}

// ============================================
// Newsletter Form
// ============================================
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (!email || !isValidEmail(email)) {
            alert('እባክዎ ትክክለኛ ኢሜይል ያስገቡ።');
            return;
        }
        
        // In a real implementation, this would subscribe the user
        console.log('Newsletter subscription:', email);
        alert(`አመሰግናለሁ! የዜና ደብዳቤችን ለማግኘት በ${email} ተመዝግበዋል።`);
        
        // Reset form
        this.reset();
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// ============================================
// Load Mock Data
// ============================================
function loadMockData() {
    loadNewsData();
    loadPricesData();
    loadJobsData();
    loadMarketplaceData();
}

function loadNewsData() {
    const newsGrid = document.querySelector('.news-grid');
    if (!newsGrid) return;
    
    // Clear loading spinner
    const spinner = newsGrid.querySelector('.loading-spinner');
    if (spinner) spinner.remove();
    
    // Mock news data
    const news = [
        {
            id: 1,
            title: 'የኢትዮጵያ ኢኮኖሚ በ2023 እየጨመረ ነው',
            excerpt: 'የዓለም ባንክ ሪፖርት እንደሚያመለክተው የኢትዮጵያ ኢኮኖሚ በዚህ ዓመት ከ6% በላይ እያደገ ነው።',
            category: 'ኢኮኖሚ',
            date: 'መስከረም 10, 2016',
            author: 'የኢትዮጵያ ቢዝነስ ማዕከል'
        },
        {
            id: 2,
            title: 'የቴክኖሎጂ ማዕከል በአዲስ አበባ ተከፈተ',
            excerpt: 'አዲስ የቴክኖሎጂ ማዕከል በአዲስ አበባ ተከፍቶ ለሺዎች የሚቆጠሩ የስራ እድሎችን ያመነጫል።',
            category: 'ቴክኖሎጂ',
            date: 'መስከረም 8, 2016',
            author: 'የኢትዮጵያ ቢዝነስ ማዕከል'
        },
        {
            id: 3,
            title: 'የካቲት ወቅት የገበያ ዋጋ ትንበያ',
            excerpt: 'የካቲት ወቅት ለሚመጣው የገበያ ዋጋ ተፅእኖ ሊያሳድር ይችላል። ዝርዝር መረጃ ከዚህ በታች።',
            category: 'ገበያ',
            date: 'መስከረም 5, 2016',
            author: 'የኢትዮጵያ ቢዝነስ ማዕከል'
        },
        {
            id: 4,
            title: 'የኢትዮጵያ አየር መንገድ አዲስ መርኃግብር አስጀመረ',
            excerpt: 'ኢትዮጵያ አየር መንገድ ወደ እስያ አዲስ በመውጫ መርኃግብር ላይ መግባቷን አስታወቀች።',
            category: 'ትራንስፖርት',
            date: 'መስከረም 3, 2016',
            author: 'የኢትዮጵያ ቢዝነስ ማዕከል'
        }
    ];
    
    // Create news cards
    news.forEach(item => {
        const newsCard = document.createElement('article');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
            <div class="news-image">
                <i class="fas fa-newspaper"></i>
            </div>
            <div class="news-content">
                <div class="news-meta">
                    <span class="news-category">${item.category}</span>
                    <span class="news-date">${item.date}</span>
                </div>
                <h3 class="news-title">${item.title}</h3>
                <p class="news-excerpt">${item.excerpt}</p>
                <a href="#" class="read-more">ተጨማሪ ያንብቡ <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        
        newsGrid.appendChild(newsCard);
    });
}

function loadPricesData() {
    const pricesTable = document.querySelector('.prices-table tbody');
    if (!pricesTable) return;
    
    // Mock price data
    const products = [
        { name: 'ስንዴ', addis: '45', diredawa: '42', hawassa: '44', bahirdar: '43', jimma: '46' },
        { name: 'ጤፍ', addis: '38', diredawa: '36', hawassa: '37', bahirdar: '35', jimma: '39' },
        { name: 'ማሽላ', addis: '55', diredawa: '52', hawassa: '54', bahirdar: '53', jimma: '56' },
        { name: 'ነጭ ሽንኩርት', addis: '120', diredawa: '115', hawassa: '118', bahirdar: '116', jimma: '122' },
        { name: 'የመን ሽንኩርት', addis: '85', diredawa: '82', hawassa: '84', bahirdar: '83', jimma: '86' },
        { name: 'የዳቦ ስንዴ', addis: '48', diredawa: '45', hawassa: '47', bahirdar: '46', jimma: '49' },
        { name: 'ዘይት', addis: '180', diredawa: '175', hawassa: '178', bahirdar: '176', jimma: '182' },
        { name: 'ሽንኩርት', addis: '65', diredawa: '62', hawassa: '64', bahirdar: '63', jimma: '66' },
        { name: 'ቃና ሻይ', addis: '320', diredawa: '310', hawassa: '315', bahirdar: '312', jimma: '325' },
        { name: 'ቡና', addis: '280', diredawa: '270', hawassa: '275', bahirdar: '272', jimma: '285' }
    ];
    
    // Create table rows
    products.forEach(product => {
        const row = document.createElement('tr');
        
        // Random price changes for demonstration
        const getPriceWithChange = (price) => {
            const basePrice = parseInt(price);
            const change = Math.floor(Math.random() * 6) - 2; // -2 to +3
            const newPrice = basePrice + change;
            const changeClass = change > 0 ? 'price-up' : change < 0 ? 'price-down' : '';
            const changeSymbol = change > 0 ? '+' : '';
            
            return `
                <td>${newPrice}</td>
                ${change !== 0 ? `<td class="price-change ${changeClass}">${changeSymbol}${change}</td>` : '<td></td>'}
            `;
        };
        
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.addis}</td>
            <td>${product.diredawa}</td>
            <td>${product.hawassa}</td>
            <td>${product.bahirdar}</td>
            <td>${product.jimma}</td>
        `;
        
        pricesTable.appendChild(row);
    });
}

function loadJobsData() {
    const jobListings = document.querySelector('.job-listings');
    if (!jobListings) return;
    
    // Mock job data
    const jobs = [
        {
            id: 1,
            title: 'ሶፍትዌር ኢንጂነር',
            company: 'ቴክኖሎጂ ኢትዮጵያ',
            type: 'ሙሉ ጊዜ',
            location: 'አዲስ አበባ',
            salary: 'ከ 25,000 ብር',
            experience: '2+ ዓመት',
            description: 'ለሶፍትዌር ልማት ብቃት ያለው ኢንጂነር ይፈልጋል።'
        },
        {
            id: 2,
            title: 'የፋይናንስ ተቀናሽ',
            company: 'ኢትዮጵያ ባንክ',
            type: 'ሙሉ ጊዜ',
            location: 'አዲስ አበባ',
            salary: 'ከ 20,000 ብር',
            experience: '3+ ዓመት',
            description: 'ለየፋይናንስ ክፍል ተቀናሽ ይፈልጋል።'
        },
        {
            id: 3,
            title: 'የግብይት ኃላፊ',
            company: 'ሳኑኪ ኢትዮጵያ',
            type: 'ሙሉ ጊዜ',
            location: 'ደሴ',
            salary: 'ከ 18,000 ብር',
            experience: '1+ ዓመት',
            description: 'ለግብይት ክፍል የሚቆጣጠር ኃላፊ ይፈልጋል።'
        },
        {
            id: 4,
            title: 'የጤና ባለሙያ',
            company: 'አዲስ አበባ ዩኒቨርሲቲ ሆስፒታል',
            type: 'ከፊል ጊዜ',
            location: 'አዲስ አበባ',
            salary: 'ከ 15,000 ብር',
            experience: 'አዲስ ተመራቂ',
            description: 'ለጤና ክፍል ባለሙያ ይፈልጋል።'
        },
        {
            id: 5,
            title: 'የአስተማሪ ስልጠና አስተማሪ',
            company: 'ኢትዮጵያ ትምህርት ሚኒስቴር',
            type: 'ሙሉ ጊዜ',
            location: 'ባህር ዳር',
            salary: 'ከ 22,000 ብር',
            experience: '4+ ዓመት',
            description: 'ለአስተማሪ ስልጠና አስተማሪ ይፈልጋል።'
        },
        {
            id: 6,
            title: 'ሲቪል ኢንጂነር',
            company: 'ኢትዮጵያ መንገዶች ባለስልጣን',
            type: 'ሙሉ ጊዜ',
            location: 'ጅማ',
            salary: 'ከ 28,000 ብር',
            experience: '5+ ዓመት',
            description: 'ለሲቪል ኢንጂነር ልማት ብቃት ያለው ይፈልጋል።'
        }
    ];
    
    // Create job cards
    jobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <div class="job-header">
                <div>
                    <h3 class="job-title">${job.title}</h3>
                    <p class="job-company">${job.company}</p>
                </div>
                <span class="job-type">${job.type}</span>
            </div>
            <div class="job-meta">
                <div class="job-meta-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${job.location}</span>
                </div>
                <div class="job-meta-item">
                    <i class="fas fa-money-bill-wave"></i>
                    <span>${job.salary}</span>
                </div>
                <div class="job-meta-item">
                    <i class="fas fa-briefcase"></i>
                    <span>${job.experience}</span>
                </div>
            </div>
            <p class="job-description">${job.description}</p>
            <a href="#" class="apply-btn">ለስራው ይመዝገቡ <i class="fas fa-arrow-right"></i></a>
        `;
        
        jobListings.appendChild(jobCard);
    });
}

function loadMarketplaceData() {
    const marketplaceGrid = document.querySelector('.marketplace-grid');
    if (!marketplaceGrid) return;
    
    // Mock marketplace data
    const listings = [
        {
            id: 1,
            title: '3 ክፍል አፓርታማ ለኪራይ',
            category: 'apartment',
            price: '8,000 ብር/ወር',
            location: 'ቦሌ, አዲስ አበባ',
            description: 'ንፁህ የ3 ክፍል አፓርታማ ከመኪና ጋራጅ ጋር።'
        },
        {
            id: 2,
            title: 'ቶዮታ ላንድ ክሩዘር 2010',
            category: 'car',
            price: '850,000 ብር',
            location: 'መስጊድ, አዲስ አበባ',
            description: 'ምርጥ ሁኔታ ያለው ቶዮታ ላንድ ክሩዘር።'
        },
        {
            id: 3,
            title: 'ላፕቶፕ ኮምፒውተር',
            category: 'electronics',
            price: '25,000 ብር',
            location: 'ፒያሳ, አዲስ አበባ',
            description: 'አዲስ ዲል ላፕቶፕ ኮምፒውተር 8GB RAM።'
        },
        {
            id: 4,
            title: 'የግብርና መሳሪያ',
            category: 'equipment',
            price: '45,000 ብር',
            location: 'ደሴ',
            description: 'ለግብርና የሚሆን ንፁህ መሳሪያ።'
        },
        {
            id: 5,
            title: '2 ክፍል አፓርታማ ለብዝ',
            category: 'apartment',
            price: '1,200,000 ብር',
            location: 'ሰማ ለካ, አዲስ አበባ',
            description: 'ንፁህ የ2 ክፍል አፓርታማ በሰማ ለካ።'
        },
        {
            id: 6,
            title: 'ሃይለንድ ማሽን',
            category: 'equipment',
            price: '15,000 ብር',
            location: 'ጅማ',
            description: 'ለግንባታ የሚሆን ሃይለንድ ማሽን።'
        }
    ];
    
    // Create listing cards
    listings.forEach(listing => {
        const categoryNames = {
            apartment: 'አፓርታማ',
            car: 'መኪና',
            equipment: 'መሳሪያ',
            electronics: 'ኤሌክትሮኒክስ'
        };
        
        const listingCard = document.createElement('div');
        listingCard.className = 'listing-card';
        listingCard.setAttribute('data-category', listing.category);
        listingCard.innerHTML = `
            <div class="listing-image">
                <i class="fas fa-${listing.category === 'apartment' ? 'home' : listing.category === 'car' ? 'car' : 'tools'}"></i>
            </div>
            <div class="listing-content">
                <span class="listing-category">${categoryNames[listing.category] || listing.category}</span>
                <h3 class="listing-title">${listing.title}</h3>
                <div class="listing-price">${listing.price}</div>
                <div class="listing-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${listing.location}</span>
                </div>
                <p class="listing-description">${listing.description}</p>
                <a href="#" class="contact-btn">ያግኙ <i class="fas fa-phone"></i></a>
            </div>
        `;
        
        marketplaceGrid.appendChild(listingCard);
    });
}

// ============================================
// Utility Functions
// ============================================
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function updateEthiopianDate() {
    // Simple Ethiopian date calculation (for demonstration)
    // In a real implementation, use a proper Ethiopian calendar library
    
    const today = new Date();
    const ethiopianDateElement = document.getElementById('current-ethiopian-date');
    const gregorianDateElement = document.getElementById('current-gregorian-date');
    
    if (ethiopianDateElement) {
        // Mock Ethiopian date (for demonstration)
        const ethiopianMonths = ['መስከረም', 'ጥቅምት', 'ኅዳር', 'ታኅሣሥ', 'ጥር', 'የካቲት', 'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ'];
        const ethiopianMonth = ethiopianMonths[today.getMonth()];
        const ethiopianDay = today.getDate();
        const ethiopianYear = 2016; // Example year
        
        ethiopianDateElement.textContent = `${ethiopianMonth} ${ethiopianDay}, ${ethiopianYear} ዓ.ም`;
    }
    
    if (gregorianDateElement) {
        // Format: Month Day, Year
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        gregorianDateElement.textContent = today.toLocaleDateString('en-US', options);
    }
}