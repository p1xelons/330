// uiHandler.js (Handles UI updates)

/*
 * renderList takes an array of strings and converts them into an HTML list (also formatted as a string).
 * Parameter:
 * data - An array of strings containing the list of parody titles to display.
 */
const renderList = (data) => {
    // TODO: Loop through the data array and build an unordered list...
    // Use map() to transform each item into a list item string
    // Use join() to merge the array into a single string
    // Wrap all of it in a <ul> element that includes a class 
    //       attribute of "data-list" and return that whole string.
    const dataHTML = `<ul class="data-list">${data.map(w => `<li>${w}</li>`).join("")}</ul>`;

    return dataHTML;
};

const populateDropdown = () => {
    const dropdown = document.querySelector('#category-select');
    const categories = [
        { id: 'video_games', name: 'Parody Video Game Titles' },
        { id: 'board_games', name: 'Parody Board Game Titles' },
        { id: 'casual_games', name: 'Parody Casual Game Titles' }
    ];
    
    dropdown.innerHTML = categories.map(category => `<option value="${category.id}">${category.name}</option>`).join('');
};

// TODO: Export renderList and populateDropdown so they can be imported into app.js
export {renderList, populateDropdown};