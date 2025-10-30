/**
 * B2BEA Learnworlds - Dynamic Collaborator Logo Injector
 * 
 * This script dynamically injects collaborator logos based on user tags.
 * The script checks the user's tags and displays appropriate collaborator logos
 * in the top bar next to the main logo.
 */

// Collaborator configuration - Easy to edit
const COLLABORATORS = {
    'dbt': {
        tag: 'dbt',
        imageUrl: 'https://media.b2bea.org/academy/iawdepartmentforbusinesstradt_dbt_logo.png',
        linkUrl: 'https://www.gov.uk/government/organisations/department-for-business-and-trade',
        id: 'dbt_logo'
    },
    'novatize': {
        tag: 'novatize',
        imageUrl: 'https://media.b2bea.org/academy/novatize-noir.png',
        linkUrl: 'https://novatize.com/en-ca',
        id: 'novatize_logo'
    },
    // Add more collaborators here following the same pattern:
    // 'tag_name': {
    //     tag: 'tag_name',
    //     imageUrl: 'https://path/to/image.png',
    //     linkUrl: 'https://collaborator-website.com',
    //     id: 'tag_name_logo'
    // }
};

/**
 * Main function to inject collaborator logos into the top bar
 */
function injectCollaboratorLogos() {
    // Check if user object exists and has tags
    if (typeof me === 'undefined' || !me.tags || !Array.isArray(me.tags)) {
        console.log('B2BEA: User tags not found or invalid');
        return;
    }

    // Check if collaborator logo is already injected
    if (document.querySelector('#collaborator_logo_wrapper')) {
        console.log('B2BEA: Collaborator logo wrapper already exists');
        return;
    }

    // Check if user has multi_user tag (required for collaborator logos)
    if (!me.tags.includes('multi_user')) {
        console.log('B2BEA: User does not have multi_user tag, collaborator logo not shown');
        return;
    }

    // Find matching collaborator based on user tags (case-insensitive)
    let matchingCollaborator = null;
    for (const userTag of me.tags) {
        const normalizedUserTag = userTag.toLowerCase();
        // Check each collaborator key case-insensitively
        for (const collaboratorKey in COLLABORATORS) {
            if (collaboratorKey.toLowerCase() === normalizedUserTag) {
                matchingCollaborator = COLLABORATORS[collaboratorKey];
                break;
            }
        }
        if (matchingCollaborator) {
            break;
        }
    }

    if (!matchingCollaborator) {
        console.log('B2BEA: No matching collaborator found for user tags');
        return;
    }

    // Find the top bar logo column
    const topbarLogoCol = document.querySelector('.lw-topbar-logo-col');
    
    if (!topbarLogoCol) {
        console.log('B2BEA: Top bar logo column not found');
        return;
    }

    // Create the collaborator logo wrapper (not a full column)
    const collaboratorWrapper = createCollaboratorWrapper(matchingCollaborator);
    
    // Insert the collaborator wrapper inside the existing logo column
    topbarLogoCol.appendChild(collaboratorWrapper);
    
    console.log(`B2BEA: Injected collaborator logo column for tag: ${matchingCollaborator.tag}`);
}

/**
 * Create HTML for a collaborator logo wrapper
 * @param {Object} collaborator - Collaborator configuration object
 * @returns {HTMLElement} DOM element for the collaborator wrapper
 */
function createCollaboratorWrapper(collaborator) {
    const wrapper = document.createElement('div');
    wrapper.className = 'lw-topbar-logo-wrapper flex-item with-flexible-parts va-c collaborator';
    wrapper.id = 'collaborator_logo_wrapper';
    
    wrapper.innerHTML = `
        <a href="${collaborator.linkUrl}">
            <img class="learnworlds-element lw-logo collaborator" 
                 src="${collaborator.imageUrl}" 
                 id="${collaborator.id}">
        </a>
    `;
    
    return wrapper;
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
        createCollaboratorWrapper,
        COLLABORATORS
    };
} 