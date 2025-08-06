/**
 * B2BEA Learnworlds - Dynamic Collaborator Logo Injector
 * 
 * This script dynamically injects collaborator logos based on user tags.
 * The script checks the user's tags and displays appropriate collaborator logos
 * in .collaborator divs.
 */

// Collaborator configuration - Easy to edit
const COLLABORATORS = {
    'dbt': {
        tag: 'dbt',
        imageUrl: 'https://media.b2bea.org/academy/departmentforbusinesstradt_dbt_logo.png',
        linkUrl: 'https://www.gov.uk/government/organisations/department-for-business-and-trade',
        id: 'dbt_logo'
    }
    // Add more collaborators here following the same pattern:
    // 'tag_name': {
    //     tag: 'tag_name',
    //     imageUrl: 'https://path/to/image.png',
    //     linkUrl: 'https://collaborator-website.com',
    //     id: 'tag_name_logo'
    // }
};

/**
 * Main function to inject collaborator logos
 */
function injectCollaboratorLogos() {
    // Check if user object exists and has tags
    if (typeof me === 'undefined' || !me.tags || !Array.isArray(me.tags)) {
        console.log('B2BEA: User tags not found or invalid');
        return;
    }

    // Find all collaborator containers
    const collaboratorContainers = document.querySelectorAll('.collaborator');
    
    if (collaboratorContainers.length === 0) {
        console.log('B2BEA: No .collaborator containers found');
        return;
    }

    // Process each user tag
    me.tags.forEach(userTag => {
        const collaborator = COLLABORATORS[userTag];
        
        if (collaborator) {
            // Create the HTML for this collaborator
            const collaboratorHtml = createCollaboratorHtml(collaborator);
            
            // Inject into each collaborator container
            collaboratorContainers.forEach(container => {
                // Check if this collaborator is already injected
                const existingLogo = document.getElementById(collaborator.id);
                if (!existingLogo) {
                    container.innerHTML += collaboratorHtml;
                    console.log(`B2BEA: Injected logo for tag: ${userTag}`);
                }
            });
        }
    });
}

/**
 * Create HTML for a collaborator logo
 * @param {Object} collaborator - Collaborator configuration object
 * @returns {string} HTML string for the collaborator
 */
function createCollaboratorHtml(collaborator) {
    return `
        <a href="${collaborator.linkUrl}" target="_blank">
            <img class="learnworlds-element lw-logo" 
                 data-node-type="image" 
                 data-magic="image" 
                 src="${collaborator.imageUrl}" 
                 id="${collaborator.id}">
        </a>
    `;
}

/**
 * Initialize the script when DOM is ready
 */
function initCollaboratorLogos() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectCollaboratorLogos);
    } else {
        // DOM is already ready
        injectCollaboratorLogos();
    }
}

// Alternative initialization for Learnworlds specific timing
function initForLearnworlds() {
    // Try to inject immediately
    injectCollaboratorLogos();
    
    // Also try after a short delay to ensure Learnworlds has loaded everything
    setTimeout(injectCollaboratorLogos, 1000);
    
    // And try again after a longer delay for dynamic content
    setTimeout(injectCollaboratorLogos, 3000);
}

// Initialize the script
initCollaboratorLogos();
initForLearnworlds();

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        injectCollaboratorLogos,
        createCollaboratorHtml,
        COLLABORATORS
    };
} 