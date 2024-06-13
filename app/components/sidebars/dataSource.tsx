const Data = [

    {
        key: 4, // Added key property
        text: 'Skin Shine',
        isSubmenu: true,
        submenuOptions:
        {
            Market: ["Concealer", "Type B", "Type C"],
            Eyes: ["Concealer", "Type B", "Type C"],
            Lips: ["Concealer", "Type B", "Type C"],
            meta: {
                style: { type: "images", columns: 5, images: 2, backgroundColor: "#f0f0f0" },
            }
        }

    },
    {
        key: 5, // Added key property
        text: 'Skin Care',
        isSubmenu: true,
        submenuOptions:
        {
            Face: ["Concealer", "Type B", "Type C"],
            Eyes: ["Concealer", "Type a", "Type asd"],
            Lips: ["Concealer", "Type B", "Type asd123"],
            meta: {
                style: { type: "images", columns: 5, images: 2, backgroundColor: "blue-600" },
            }
        }

    },
    { key: 0, text: 'Tape', isSubmenu: false },
    { key: 1, text: 'Maracuja Lip', isSubmenu: false },
    { key: 2, text: 'New', isSubmenu: false },
    { key: 3, text: 'Best Seller', isSubmenu: false },
];

export default Data;
