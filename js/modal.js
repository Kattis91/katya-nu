function openModal(projectId) {
    const modal = document.getElementById(projectId + '-modal');
    modal.style.display = 'flex';
    modal.classList.add('active');
    modal.classList.remove('closing');
    document.body.style.overflow = 'hidden';
    
    // Reset tab state for this modal
    resetModalTabs(modal);
}

function resetModalTabs(modal) {
    // Reset all tabs in this modal to default state
    const tabButtons = modal.querySelectorAll('.tab-btn');
    const tabPanels = modal.querySelectorAll('.tab-panel');
    
    // Remove active from all
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));
    
    // Activate first tab and panel
    if (tabButtons.length > 0) tabButtons[0].classList.add('active');
    if (tabPanels.length > 0) tabPanels[0].classList.add('active');
}

function closeModal(projectId) {
    const modal = document.getElementById(projectId + '-modal');
    modal.classList.remove('active');
    modal.classList.add('closing');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300); // Match the CSS transition duration
}

function switchTab(tabId) {
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Remove active class from all tab panels
    const tabPanels = document.querySelectorAll('.tab-panel');
    tabPanels.forEach(panel => panel.classList.remove('active'));
    
    // Add active class to clicked tab button
    event.target.classList.add('active');
    
    // Show corresponding tab panel
    document.getElementById(tabId).classList.add('active');
}