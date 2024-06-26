// document.addEventListener("DOMContentLoaded", function() {
//     const tabs = document.querySelectorAll(".tab");
//     const contents = document.querySelectorAll(".tab-content");
//     const searchInput = document.getElementById("search-input");
//     let allTableRows = document.querySelectorAll("tbody tr");

//     // Function to handle tab clicks
//     function handleTabClick(tab) {
//         const contentId = tab.getAttribute("data-content");

//         tabs.forEach(t => t.classList.remove("active"));
//         contents.forEach(c => c.classList.remove("active"));

//         tab.classList.add("active");
//         document.getElementById(contentId).classList.add("active");

//         // Update allTableRows to include all table rows
//         allTableRows = document.querySelectorAll("tbody tr");
//     }

//     // Function to filter table rows based on search input
//     function filterTableRows(query) {
//         allTableRows.forEach(row => {
//             const cells = row.querySelectorAll("td");
//             const rowText = Array.from(cells).map(cell => cell.textContent.trim().toLowerCase()).join(" ");
//             const isVisible = rowText.includes(query) || query === "";

//             if (isVisible) {
//                 row.style.display = "";
//                 cells.forEach(cell => {
//                     if (cell.textContent.toLowerCase().includes(query)) {
//                         cell.classList.add("highlight");
//                     } else {
//                         cell.classList.remove("highlight");
//                     }
//                 });
//             } else {
//                 row.style.display = "none";
//                 cells.forEach(cell => {
//                     cell.classList.remove("highlight");
//                 });
//             }
//         });
//     }

//     // Add event listener for tab clicks
//     tabs.forEach(tab => {
//         tab.addEventListener("click", function() {
//             handleTabClick(this);
//         });
//     });

//     // Add event listener for search input
//     searchInput.addEventListener("input", function() {
//         const query = this.value.trim().toLowerCase();
        
//         // Show loading spinner
//         allTableRows.forEach(row => {
//             row.style.opacity = 0;
//         });

//         setTimeout(() => {
//             // Hide loading spinner
//             allTableRows.forEach(row => {
//                 row.style.opacity = 1;
//             });

//             // Filter table rows based on search query
//             filterTableRows(query);
//         }, 300); // Adjust delay as needed for animation duration

//         searchInput.addEventListener("keydown", function(event) {
//             if (event.key === "Backspace" && this.value.trim() === "") {
//                 location.reload();
//             }
//         });
//     });

    
    
// });




document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content");
    const searchInput = document.getElementById("search-input");
    let allTableRows = document.querySelectorAll("tbody tr");

    // Function to handle tab clicks
    function handleTabClick(tab) {
        const contentId = tab.getAttribute("data-content");

        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        tab.classList.add("active");
        document.getElementById(contentId).classList.add("active");
    }

    // Function to filter table rows based on search input
    function filterTableRows(query) {
        let hasVisibleRows = {};

        allTableRows.forEach(row => {
            const cells = row.querySelectorAll("td");
            const rowText = Array.from(cells).map(cell => cell.textContent.trim().toLowerCase()).join(" ");
            const isVisible = rowText.includes(query) || query === "";

            if (isVisible) {
                row.style.display = "";
                const tabId = row.closest(".tab-content").id;
                hasVisibleRows[tabId] = true;

                cells.forEach(cell => {
                    if (cell.textContent.toLowerCase().includes(query)) {
                        cell.classList.add("highlight");
                    } else {
                        cell.classList.remove("highlight");
                    }
                });
            } else {
                row.style.display = "none";
                cells.forEach(cell => {
                    cell.classList.remove("highlight");
                });
            }
        });

        // Show tabs that have visible rows
        tabs.forEach(tab => {
            const contentId = tab.getAttribute("data-content");
            if (hasVisibleRows[contentId]) {
                tab.style.display = "";
            } else {
                tab.style.display = "none";
            }
        });

        // Show the first tab that has visible rows or the first tab if none are visible
        const firstVisibleTab = Array.from(tabs).find(tab => tab.style.display !== "none");
        if (firstVisibleTab) {
            handleTabClick(firstVisibleTab);
        } else {
            handleTabClick(tabs[0]);
        }
    }

    // Add event listener for tab clicks
    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            handleTabClick(this);
        });
    });

    // Add event listener for search input
    searchInput.addEventListener("input", function() {
        const query = this.value.trim().toLowerCase();
        
        // Show loading spinner
        allTableRows.forEach(row => {
            row.style.opacity = 0;
        });

        setTimeout(() => {
            // Hide loading spinner
            allTableRows.forEach(row => {
                row.style.opacity = 1;
            });

            // Filter table rows based on search query
            filterTableRows(query);
        }, 300); // Adjust delay as needed for animation duration
    });

    // Add event listener for backspace key in search input
    searchInput.addEventListener("keydown", function(event) {
        if (event.key === "Backspace" && this.value.trim() === "") {
            location.reload();
        }
    });
});
