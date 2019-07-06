const { __ } = wp.i18n;

export const bokez = {

    buttonSizes: [
		{ value: 'small', label: __( 'Small' , 'bokez') },
		{ value: 'default', label: __( 'Default' , 'bokez') },
		{ value: 'medium', label: __( 'Medium' , 'bokez') },
        { value: 'large', label: __( 'Large' , 'bokez') },
    ],
    
    buttonTypes: [
		{ value: 'flat', label: __( 'Flat' , 'bokez') },
		{ value: 'rounded', label: __( 'Rounded' , 'bokez') },
        { value: 'calltoaction', label: __( 'Call To Action' , 'bokez') },
	],

    borderTypes: [
		{ value: 'solid', label: __( 'Solid' , 'bokez') },
		{ value: 'dashed', label: __( 'Dashed' , 'bokez') },
		{ value: 'dotted', label: __( 'Dotted' , 'bokez') },
        { value: 'double', label: __( 'Double' , 'bokez') },
		{ value: 'ridge', label: __( 'Ridge' , 'bokez') },
	],

    borderPositions: [
        { value: 'left', label: __( 'Left' , 'bokez') },
        { value: 'right', label: __( 'Right' , 'bokez') },
        { value: 'top', label: __( 'Top' , 'bokez') },
        { value: 'bottom', label: __( 'Bottom' , 'bokez') },
    ],

    notificationTypes: [
		{ value: 'info', label: __( 'Info' , 'bokez') },
		{ value: 'error', label: __( 'Error' , 'bokez') },
		{ value: 'success', label: __( 'Success' , 'bokez') },
		{ value: 'warning', label: __( 'Warning' , 'bokez') },
	],

    /**
     * Default Colors
     */
    colors: [
        { color: '#F9583B', name: 'GPB Color' },
        { color: '#e84393', name : 'Prunus Avium' },
        { color: '#d63031', name : 'Chi-gong' },
        { color: '#fd79a8', name: 'Pico-8' },
        { color: '#00cec9', name : 'Robin\'s Egg Blue' },
        { color: '#e17055', name : 'Orange Ville' },
        { color: '#fdcb6e', name : 'Bright Yarrow' },
        { color: '#55efc4', name : 'Light Greenish Blue' },
        { color: '#00b894', name : 'Mint Leaf' },
        { color: '#6c5ce7', name : 'Exodus Fruit' },
        { color: '#ffeaa7', name : 'Sour Lemon' },
        { color: '#fab1a0', name : 'First Date' },
        { color: '#74b9ff', name : 'Green Darnet Tail' },
        { color: '#a29bfe', name : 'Sky Moment' },
        { color: '#2d3436', name : 'Dracula Orchid' },
        { color: '#dfe6e9', name : 'City Lights' },
        { color: '#636e72', name : 'American River' },	
    ],

    /**
     * Capitalize first character	
     * @param {string} string 
     * @return string
     */
    ucfirst: (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    /**
     * Generate unique id
     * @return string
     */
    uniqueID: () => {
        return 'bokez-' + new Date().getTime();
    },

    /**
     * PHP parse_url Like
     * @return object
     */
    parse_url: ( url ) => {

        var parser = document.createElement('a');
        parser.href = url;

        return {
            protocol: parser.protocol.replace(':', ''),
            hostname: parser.hostname,
            port: parser.port,
            path: parser.pathname,
            query: parser.search,
            hash: parser.hash,
        }
    }
};
