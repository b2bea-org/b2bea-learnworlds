# B2BEA Learnworlds - Dynamic Collaborator Logo Injector

This JavaScript script dynamically injects collaborator logos into Learnworlds pages based on user tags. When a user has specific tags, the corresponding collaborator logo will be displayed in `.collaborator` divs.

## How It Works

1. The script reads the user's tags from the `me` object in Learnworlds
2. It checks if any of the user's tags match configured collaborators
3. For matching tags, it injects the collaborator logo HTML into `.collaborator` containers
4. Each logo links to the collaborator's website and opens in a new window

## Installation

1. JS is added via www.jsdelivr.com pulling from this github repo
2. Include the script in your Learnworlds pages via header customer code html block.
3. Ensure you have `.collaborator` divs in your HTML where logos should appear

## Adding New Collaborators

To add a new collaborator, edit the `COLLABORATORS` object in the script:

```javascript
const COLLABORATORS = {
    'dbt': {
        tag: 'dbt',
        imageUrl: 'https://media.b2bea.org/academy/departmentforbusinesstradt_dbt_logo.png',
        linkUrl: 'https://www.gov.uk/government/organisations/department-for-business-and-trade',
        id: 'dbt_logo'
    },
    // Add your new collaborator here:
    'your_tag': {
        tag: 'your_tag',
        imageUrl: 'https://path/to/your/logo.png',
        linkUrl: 'https://your-collaborator-website.com',
        id: 'your_tag_logo'
    }
};
```

### Parameters Explained

- **tag**: The tag that users must have to see this logo
- **imageUrl**: The URL of the collaborator's logo image
- **linkUrl**: The URL where clicking the logo will take users
- **id**: Unique identifier for the logo element (format: `tag_logo`)

## Example Usage

If a user has the tag `"dbt"`, the script will inject:

```html
<a href="https://www.gov.uk/government/organisations/department-for-business-and-trade" target="_blank">
    <img class="learnworlds-element lw-logo" 
         data-node-type="image" 
         data-magic="image" 
         src="https://media.b2bea.org/academy/departmentforbusinesstradt_dbt_logo.png" 
         id="dbt_logo">
</a>
```

## Features

- **Easy to edit**: Simple configuration object for adding new collaborators
- **Duplicate prevention**: Won't inject the same logo multiple times
- **Learnworlds compatible**: Works with Learnworlds timing and DOM structure
- **Console logging**: Provides feedback about what's happening
- **Multiple containers**: Works with multiple `.collaborator` divs on the same page

## Troubleshooting

- Check the browser console for log messages starting with "B2BEA:"
- Ensure the `me` object contains the expected tags
- Verify that `.collaborator` divs exist in your HTML
- Make sure image URLs are accessible and valid

## Requirements

- Learnworlds platform with user tags
- `.collaborator` divs in your HTML
- Valid image URLs for collaborator logos 