'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // Get all dark-light switchers
    var switchers = document.querySelectorAll('.dark-light-switcher');

    // Sync dark/light switcher UI with Bootstrap color mode (data-bs-theme)
    function updateTheme(isDarkMode) {
        switchers.forEach(function (switcher) {
            var checkbox = switcher.querySelector('#switch');

            if (checkbox) {
                checkbox.checked = isDarkMode;
            }
        });

        document.documentElement.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light');
    }

    // Priority: HTML hardcoded attribute > localStorage > optional JS config > default
    var htmlTheme = document.documentElement.getAttribute('data-bs-theme');
    var savedTheme = localStorage.getItem('theme');
    var defaultTheme = 'light';

    var siteColorConfig = window.idekoTemplateConfig || window.idekoThemeConfig;
    if (siteColorConfig && siteColorConfig.defaultDarkMode) {
        defaultTheme = 'dark';
    }

    var currentTheme;
    if (htmlTheme === 'dark' || htmlTheme === 'light') {
        currentTheme = htmlTheme;
    } else if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
        currentTheme = savedTheme;
    } else {
        currentTheme = defaultTheme;
    }

    var isDarkMode = currentTheme === 'dark';

    // Apply Bootstrap color mode immediately if different from current
    if (document.documentElement.getAttribute('data-bs-theme') !== currentTheme) {
        document.documentElement.setAttribute('data-bs-theme', currentTheme);
    }

    // Initialize checkbox state based on current color mode
    updateTheme(isDarkMode);

    // Add event listeners to all switchers
    switchers.forEach(function (switcher) {
        switcher.addEventListener('click', function () {
            var checkbox = switcher.querySelector('#switch');

            if (checkbox) {
                // Get current state from checkbox
                var isDarkMode = checkbox.checked;

                // Persist color mode to localStorage (key kept for backward compatibility)
                var newTheme = isDarkMode ? 'dark' : 'light';
                localStorage.setItem('theme', newTheme);

                // Update data-bs-theme attribute
                document.documentElement.setAttribute('data-bs-theme', newTheme);
            }
        });
    });
});
