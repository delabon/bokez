import BackgroundControl from '../../components/background-control';
import ColorControl from '../../components/color-control';
import { bokez } from '../../global';

import { 
    col1Icon, 
    col2Icon, 
    col2LargeLeftIcon, 
    col2LargeRightIcon, 
    col3Icon, 
    col3LargeLeftIcon, 
    col3LargeRightIcon, 
    col3LargeCenterIcon, 
    col4Icon,
    col4LargeLeftIcon,
    col4LargeRightIcon,
    col5Icon,
} from '../../icons';

const { __ } = wp.i18n;

const { Fragment, Component } = wp.element;

const {
    InnerBlocks, 
	InspectorControls,
} = wp.editor;

const {
	Button,
	ButtonGroup,
	Tooltip,
	TabPanel,
	Dashicon,
	PanelBody,
	RangeControl,
    SelectControl,
} = wp.components;

const layoutOptions = [
    { 
        key: 'equal', 
        col: 1, 
        name: __( 'One: 100' , 'bokez'), 
        icon: function ( width = "100", height = "50", fill = "#e5e5e5" ){
            return col1Icon( width, height, fill )
        } 
    },
    { 
        key: 'equal', 
        col: 2, 
        name: __( 'Two: 50/50' , 'bokez'), 
        icon: function ( width = "100", height = "50", fill = "#e5e5e5" ){
            return col2Icon( width, height, fill ) 
        }
    },
    { 
        key: 'large-left', 
        col: 2, 
        name: __( 'Two: 66/33' , 'bokez'), 
        icon: function ( width = "100", height = "50", fill = "#e5e5e5" ){
            return col2LargeLeftIcon( width, height, fill )
        }
    },
    { 
        key: 'large-right', 
        col: 2, 
        name: __( 'Two: 33/66' , 'bokez'), 
        icon: function ( width = "100", height = "50", fill = "#e5e5e5" ){
            return col2LargeRightIcon( width, height, fill )
        }
    },
    { 
        key: 'equal', 
        col: 3, 
        name: __( 'Three: 33/33/33' , 'bokez'), 
        icon: function ( width = "100", height = "50", fill = "#e5e5e5" ){
            return col3Icon( width, height, fill )
        }
    },
    { 
        key: 'large-left', 
        col: 3, 
        name: __( 'Three: 50/25/25' , 'bokez'), 
        icon: function ( width = "100", height = "50", fill = "#e5e5e5" ){
            return col3LargeLeftIcon( width, height, fill )
        }
    },
    { 
        key: 'large-right', 
        col: 3, 
        name: __( 'Three: 25/25/50' , 'bokez'), 
        icon: function ( width = "100", height = "50", fill = "#e5e5e5" ){
            return col3LargeRightIcon( width, height, fill )
        }
    },
    { 
        key: 'large-center', 
        col: 3, 
        name: __( 'Three: 25/50/25' , 'bokez'), 
        icon: function ( width = "100", height = "50", fill = "#e5e5e5" ){ 
            return col3LargeCenterIcon( width, height, fill )
        }
    },
    { 
        key: 'equal', 
        col: 4, name: __( 'Four: 25/25/25/25' , 'bokez'), 
        icon: function ( width = "100", height = "50", fill = "#e5e5e5" ){
            return col4Icon( width, height, fill )
        }
    },
    { key: 
        'large-left', 
        col: 4, 
        name: __( 'Four: 40/20/20/20' , 'bokez'), 
        icon: function ( width = "100", height = "50", fill = "#e5e5e5" ){
            return col4LargeLeftIcon( width, height, fill )
        }
    },
    { key: 
        'large-right', 
        col: 4, 
        name: __( 'Four: 20/20/20/40' , 'bokez'), 
        icon: function ( width = "100", height = "50", fill = "#e5e5e5" ){
            return col4LargeRightIcon( width, height, fill )
        }
    },
    { 
        key: 'equal', 
        col: 5, 
        name: __( 'Five Columns' , 'bokez'), 
        icon: function ( width = "100", height = "50", fill = "#e5e5e5" ){
            return col5Icon( width, height, fill ) 
        }
    },

];


/**
 * Renders the block style
 * @param {array} attributes 
 */
export const renderStyle = function( attributes ){

    const {
        uid,
        background_type,
        background_color,
        gradient_orientation,
        gradient_from,
        gradient_to,
        background_image_url,
        background_image_size,
        background_image_position,
        background_image_repeat,
        background_image_attachment,
        paddingTop,
        paddingBottom,
        marginTop,
        marginBottom,
        text_color,
        link_color,
        link_color_hover,
    } = attributes;

    let output = `
        
        #${uid}.bokez-row{
            background-color: ${background_color};
            padding-top: ${paddingTop / 5}em;
            padding-bottom: ${paddingBottom / 5}em;
            margin-top: ${marginTop / 5}em;
            margin-bottom: ${marginBottom / 5}em;
            color: ${text_color};
        }

        #${uid}.bokez-row a{
            color: ${link_color};
        }

        #${uid}.bokez-row a:hover{
            color: ${link_color_hover};
        }
    `;

    if( background_type === 'gradient' ){
        output += `
            #${uid}.bokez-row{
                background-image: linear-gradient( ${gradient_orientation.replace('-', ' ')}, ${gradient_from}, ${gradient_to} );
            }
        `;
    }

    else if( background_type === 'image' ){
        output += `
            #${uid}.bokez-row{
                background-image: url('${ background_image_url }');
                background-repeat: ${ background_image_repeat };
                background-attachment: ${ background_image_attachment };
                background-size: ${ background_image_size };
                background-position: ${ background_image_position };
            }
        `;
    }

    return (
        <style>{ output }</style>
    );
}


/**
 * Edit Class
 */
export class Edit extends Component{

	/**
	 * Constructor.
	 * Sets up state, and creates bindings for functions.
	 */
	constructor(){
		super(...arguments);

        this.generateID = this.generateID.bind( this );        
        this.getLayoutIcons = this.getLayoutIcons.bind( this );        
        this.desktopColumnsIcons = this.desktopColumnsIcons.bind( this );
        this.tabletColumnsIcons = this.tabletColumnsIcons.bind( this );
        this.mobileColumnsIcons = this.mobileColumnsIcons.bind( this );
        this.getLayoutListByArgs = this.getLayoutListByArgs.bind( this );
    }

    componentDidMount(){
        this.generateID();
    }

    /**
     * Generates a unique id
     */
    generateID(){
        const self = this;

        // fix for block with same uid
        if( self.props.attributes.uid !== '' ){
            const found_uid = document.querySelectorAll( '#' + self.props.attributes.uid );

            if( found_uid.length > 1 ){
                self.props.setAttributes({ uid : bokez.uniqueID() });
            }
        }
        // create id
        else {
            self.props.setAttributes({ uid : bokez.uniqueID() });
        }
    }

    /**
     * Returns columns array.
     *
     * @param {number} columns Number of columns.
     *
     * @return {Object}
     */
    getColumnsTemplate( columns ){
        
        let arr = [];

        for ( let index = 1; index <= columns; index++) {

            const data = { id: index };

            if( index === 1 ){
                data.classes = 'first';
            }
            else if ( index === columns ){
                data.classes = 'last';
            } 

            arr.push( [ 'bokez/column', data ] );
        }
        
        return arr;
    }

    /**
     * Returns an button group with icons
     * @param {array} iconList 
     * @param {object} selectedItem 
     * @param {string} width 
     * @param {string} height 
     */
    getLayoutIcons( device, iconList, selectedItem, width = "100", height = "50" ){

        const self = this; 

        return (
            <ButtonGroup aria-label={ __( 'Column Layout' , 'bokez') }>

                { iconList.map(function( item ){

                    const isSelected = item.key == selectedItem.key && item.col == selectedItem.col ? true : false;

                    return ( 
                        <Tooltip text={ item.name }>
                            <Button
                                key={ item.key }
                                className="bokez-layout-btn"
                                data-columns = { item.col }
                                data-layout = { item.key }
                                data-selected = { isSelected }
                                onClick={ () => {

                                    if( device === "desktop" ){
                                        self.props.setAttributes( {
                                            desktopLayout: item.key,
                                            desktopColumns: item.col,
                                            tabletLayout: item.key,
                                            tabletColumns: item.col,
                                            mobileLayout: item.key,
                                            mobileColumns: item.col,
                                        } );
                                    }
                                    else if ( device === "tablet" ){
                                        self.props.setAttributes( {
                                            tabletLayout: item.key,
                                            tabletColumns: item.col,
                                            mobileLayout: item.key,
                                            mobileColumns: item.col,
                                        } );
                                    }
                                    else{
                                        self.props.setAttributes({
                                            mobileLayout: item.key,
                                            mobileColumns: item.col,
                                        });
                                    }

                                } }
                            >
                                { item.icon( width, height ) }
                            </Button>
                        </Tooltip> 
                    )
                })}

            </ButtonGroup>
        )
    }

    desktopColumnsIcons(){
        return this.getLayoutIcons( "desktop", layoutOptions, {
            key: this.props.attributes.desktopLayout,
            col: this.props.attributes.desktopColumns
        }, "60", "30" );
    }

    /**
     * Returns layout list which its cols are lower than the selectedCol parameter
     * @param {int} selectedCol 
     * @param {string} selectedKey 
     */
    getLayoutListByArgs( selectedCol, selectedKey ){

        let listToReturn = [];

        layoutOptions.map(function( item ){
            if( item.col <= selectedCol ){

                if( item.key == 'equal' ){
                    listToReturn = [ ...listToReturn, item ];
                }
                
                if( item.col == selectedCol && item.key != "equal" && item.key == selectedKey ){
                    listToReturn = [ ...listToReturn, item ];
                }

                return item;
            }
        });

        return listToReturn;
    }

    tabletColumnsIcons(){        
        const self = this;
        const selectedCol = self.props.attributes.desktopColumns;
        const selectedKey = self.props.attributes.desktopLayout;
        const listToReturn = this.getLayoutListByArgs( selectedCol, selectedKey );
        
        return this.getLayoutIcons( "tablet", listToReturn, {
            key: self.props.attributes.tabletLayout,
            col: self.props.attributes.tabletColumns
        }, "60", "30" );
    }

    mobileColumnsIcons(){
        const self = this;
        const selectedCol = self.props.attributes.tabletColumns;
        const selectedKey = self.props.attributes.tabletLayout;
        const listToReturn = this.getLayoutListByArgs( selectedCol, selectedKey );

        return this.getLayoutIcons( "mobile", listToReturn, {
            key: self.props.attributes.mobileLayout,
            col: self.props.attributes.mobileColumns
        }, "60", "30" );
    }

    /**
	 * Renders the component.
	**/
    render(){        
        let self = this;

        const { 
            isSelected, 
            setAttributes,
            attributes,
        } = self.props;
        
        const { 
            uid,
            desktopLayout,
            desktopColumns,
            tabletLayout,
            tabletColumns,
            mobileLayout,
            mobileColumns,
            paddingTop,
            paddingBottom,
            marginTop,
            marginBottom,
            column_gutter,
            background_type,
            background_color,
            gradient_orientation,
            gradient_from,
            gradient_to,
            background_image_url,
            background_image_id,
            background_image_repeat,
            background_image_size,
            background_image_position,
            background_image_attachment,
            text_color,
            link_color,
            link_color_hover,
        } = attributes;

        return [

            isSelected && (

                <InspectorControls>

                    <TabPanel 
                        id = "bokez-inspect-tabs"
                        className = "bokez-inspect-tabs"
                        activeClass = "bokez-active-tab"
                        initialTabName = "desktop"
                        tabs={ [
                            {
                                name: 'desktop',
                                title: __('Desktop', 'bokez'),
                                className: 'bokez-desk-tab',
                            },
                            {
                                name: 'tablet',
                                title: __('Tablet', 'bokez'),
                                className: 'bokez-tablet-tab',
                            },
                            {
                                name: 'mobile',
                                title: __('Mobile', 'bokez'),
                                className: 'bokez-mobile-tab',
                            },
                        ] }
                    >
                        {( tab ) => {
                            
                            let content = self.desktopColumnsIcons();

                            if( tab.name === 'tablet' ){
                                content = self.tabletColumnsIcons();
                            }
                            else if ( tab.name === 'mobile' ){
                                content = self.mobileColumnsIcons();
                            }

                            return <div>{ content }</div>
                        }}
                    </TabPanel>

                    <SelectControl
                        label = { __('Column Gutter', 'bokez') }
                        value= { column_gutter }
                        options={ [
                            { label: __('60px', 'bokez'), value: '60' },
                            { label: __('50px', 'bokez'), value: '50' },
                            { label: __('40px', 'bokez'), value: '40' },
                            { label: __('30px', 'bokez'), value: '30' },
                            { label: __('20px', 'bokez'), value: '20' },
                            { label: __('10px', 'bokez'), value: '10' },
                            { label: __('0', 'bokez'), value: '0' },
                        ] }
                        onChange={ ( newValue ) => setAttributes({ column_gutter : newValue }) }
                    />


                    <PanelBody
                        title={ __('Padding / Margin', 'bokez') }
                        initialOpen={ false }
                    >

                        <RangeControl
                            label = { __('Padding Top', 'bokez') }
                            min = { 0 }
                            max = { 100 }
                            value={ paddingTop }
                            onChange={ ( newValue = 0 ) => {
                                setAttributes( { paddingTop: newValue } );
                            } }
                        />

                        <RangeControl
                            label = { __('Padding Bottom', 'bokez') }
                            min = { 0 }
                            max = { 100 }
                            value={ paddingBottom }
                            onChange={ ( newValue = 0 ) => {
                                setAttributes( { paddingBottom: newValue } );
                            } }
                        />

                        <RangeControl
                            label = { __('Margin Top', 'bokez') }
                            min = { 0 }
                            max = { 100 }
                            value={ marginTop }
                            onChange={ ( newValue = 0 ) => {
                                setAttributes( { marginTop: newValue } );
                            } }
                        />

                        <RangeControl
                            label = { __('Margin Bottom', 'bokez') }
                            min = { 0 }
                            max = { 100 }
                            value={ marginBottom }
                            onChange={ ( newValue = 0 ) => {
                                setAttributes( { marginBottom: newValue } );
                            } }
                        />

                    </PanelBody>


                    <PanelBody
                        title={ __('Background Settings', 'bokez') }
                        initialOpen={ false }
                    >
                            
                        <BackgroundControl
                            className={ "woolook" }

                            type = { background_type }
                            onTypeChange = { ( value = 'color' ) => {
                                setAttributes( { background_type: value } );
                            }}
                            
                            color = { background_color }
                            onColorChange = { ( value = '#fff' ) => {
                                setAttributes( { background_color: value } );
                            }}

                            gradient_orientation = { gradient_orientation }
                            onGradientOrientationChange = { ( value = 'to right top' ) => {
                                setAttributes( { gradient_orientation: value } );
                            }}

                            gradient_from = { gradient_from }
                            onGradientFromChange = { ( value = '#fff' ) => {
                                setAttributes( { gradient_from: value } );
                            }}

                            gradient_to = { gradient_to }
                            onGradientToChange = { ( value = '#fff' ) => {
                                setAttributes( { gradient_to: value } );
                            }}

                            image_url = { background_image_url }
                            image_id = { background_image_id }
                            onImageChange = { ( media ) => setAttributes( { background_image_url: media.url, background_image_id: media.id } ) }
                            onImageRemove = { ( media ) => setAttributes( { background_image_url: '', background_image_id: 0 } ) }

                            image_size = { background_image_size }
                            onImageSizeChange = { ( value = 'cover' ) => setAttributes( { background_image_size: value } ) }

                            image_position = { background_image_position }
                            onImagePositionChange = { ( value = 'center center' ) => setAttributes( { background_image_position: value } ) }

                            image_attachment = { background_image_attachment }
                            onImageAttachmentChange = { ( value = 'scroll' ) => setAttributes( { background_image_attachment: value } ) }

                            image_repeat = { background_image_repeat }
                            onImageRepeatChange = { ( value = 'no-repeat' ) => setAttributes( { background_image_repeat: value } ) }

                        ></BackgroundControl>

                    </PanelBody>


                    <PanelBody
                        title={ __('Text Settings', 'bokez') }
                        initialOpen={ false }
                    >

                        <ColorControl
                            label = { __('Text Color', 'bokez') }
                            value = { text_color }
                            onChange={ ( newValue ) => setAttributes({ text_color: newValue }) } 
                        />

                        <ColorControl
                            label = { __('Link Color', 'bokez') }
                            value = { link_color }
                            onChange={ ( newValue ) => setAttributes({ link_color: newValue }) } 
                        />

                        <ColorControl
                            label = { __('Link Color (Hover)', 'bokez') }
                            value = { link_color_hover }
                            onChange={ ( newValue ) => setAttributes({ link_color_hover: newValue }) } 
                        />
                    
                    </PanelBody>


                </InspectorControls>
                
            ),

            <Fragment>

                { renderStyle( attributes ) }
                
                <div 
                    id = { uid }
                    className= { `bokez-row bokez-row-gutter-${column_gutter} bokez-row-mobile-${mobileLayout} bokez-row-tablet-${tabletLayout} bokez-row-desktop-${desktopLayout} bokez-row-mobile-${mobileColumns} bokez-row-tablet-${tabletColumns} bokez-row-desktop-${desktopColumns}` }            
                >
                    

                    { ! desktopLayout && (
                        <div className = { 'bokez-row-layout' } >{ 
                            self.getLayoutIcons( "desktop", layoutOptions, { 
                                key: desktopLayout, 
                                col: desktopColumns 
                            }) 
                        }</div>
                    ) }

                    { desktopLayout && (
                        <Fragment>

                            <div className = "bokez-row-edit-icon" >
                                <Dashicon icon="admin-generic"/>
                            </div>

                            <div className = "bokez-row-container" >

                                <InnerBlocks
                                    template = { self.getColumnsTemplate( desktopColumns ) }
                                    templateLock = "all"
                                    allowedBlocks = { [ 'bokez/column' ] } />

                            </div>

                        </Fragment>
                    ) }

                </div>

            </Fragment>

        ];
    };
}