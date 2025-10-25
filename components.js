// components.js - Reusable UI components

// Modal component
class Modal {
    constructor(id, content) {
        this.id = id;
        this.content = content;
        this.create();
    }

    create() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = this.id;
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                ${this.content}
            </div>
        `;
        document.body.appendChild(modal);
        this.addEventListeners();
    }

    addEventListeners() {
        const modal = document.getElementById(this.id);
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');

        closeBtn.addEventListener('click', () => this.close());
        overlay.addEventListener('click', () => this.close());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    open() {
        const modal = document.getElementById(this.id);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        const modal = document.getElementById(this.id);
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Tabs component
const initTabs = () => {
    const tabContainers = document.querySelectorAll('.tabs');
    
    tabContainers.forEach(container => {
        const tabs = container.querySelectorAll('.tab-button');
        const panels = container.querySelectorAll('.tab-panel');

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and panels
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));

                // Add active class to clicked tab and corresponding panel
                tab.classList.add('active');
                panels[index].classList.add('active');
            });
        });
    });
};

// Accordion component
const initAccordions = () => {
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
        const headers = accordion.querySelectorAll('.accordion-header');

        headers.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const isActive = item.classList.contains('active');

                // Close all items
                accordion.querySelectorAll('.accordion-item').forEach(i => {
                    i.classList.remove('active');
                });

                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    });
};

// Tooltip component
const initTooltips = () => {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = el.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);

            const rect = el.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';

            setTimeout(() => tooltip.classList.add('show'), 10);
        });

        el.addEventListener('mouseleave', () => {
            const tooltips = document.querySelectorAll('.tooltip');
            tooltips.forEach(t => {
                t.classList.remove('show');
                setTimeout(() => t.remove(), 200);
            });
        });
    });
};

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initAccordions();
    initTooltips();
});

// Export for use in other files
window.Modal = Modal;
