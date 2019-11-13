import { bokez } from '../../global';
import { DeleteIcon, UploadImageIcon, ArrowLeftIcon, ArrowRightIcon } from '../../icons';

const { __ } = wp.i18n;
const { Fragment, Component } = wp.element;

const {
    PanelColorSettings,	
    InspectorControls, 
    AlignmentToolbar, 
    BlockControls,
    RichText,
    MediaUpload,
} = wp.blockEditor;

const { 
    Button,
    ToggleControl
} = wp.components;

export class Edit extends Component{

    /**
	 * Constructor.
	 * Sets up state, and creates bindings for functions.
	 * @param object props - current component properties.
	 */
	constructor( props ){
		super(...arguments);
		this.props = props;

        this.updateItem = this.updateItem.bind( this );
        this.addItem    = this.addItem.bind( this );
        this.removeItem = this.removeItem.bind( this );
        this.renderPoints = this.renderPoints.bind( this );
        this.renderArrows = this.renderArrows.bind( this );
    }

    /**
     * Update item when changed
     * @param {string} newValue 
     * @param {number} index 
     * @param {string} key 
     */
    updateItem( newValue, index, key ){

        let data = JSON.parse( this.props.attributes.itemsJson );

        data.map( function( item, currIndex ) {
            if( index == currIndex ){
                item[ key ] = newValue;
            }

            return item;
        });

        this.props.setAttributes({ 
            'itemsJson': JSON.stringify( data ), 
        });
    }

    /**
     * Adds new item to the items array
     */
    addItem(){

        let data = JSON.parse( this.props.attributes.itemsJson );
        
        if( data.length == 4 ) return;

        this.props.setAttributes({
            'itemsJson': JSON.stringify( data.concat(
                [{
                    message: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
                    name: 'Name',
                    job: 'Job',
                    imageUrl: '',
                    imageID: 0,
                }]
            ))
        });
    }

    /**
     * removes an item from the items array
     */
    removeItem( event ){

        let data = JSON.parse( this.props.attributes.itemsJson );

        data = data.filter(function( citem, cindex ){
            return cindex != event.currentTarget.getAttribute('data-index');
        });

        this.props.setAttributes({ 
            'itemsJson':  JSON.stringify( data )
        })
    }

	/**
	 * When the component mounts it calls this function.
	 */
	componentDidMount() {}
    
    /**
     * When the component updates
     * @param {object} prevProps 
     * @param {object} prevState 
     */
    componentDidUpdate(prevProps, prevState) {

        let self = this;
        let prevAtts = prevProps.attributes;
        let newAtts = self.props.attributes;

        if( newAtts.items.length === prevAtts.items.length ) return;

        let parentUI = jQuery('[data-block="'+self.props.clientId+'"] .bokez-testimonials');
        let itemsUI = parentUI.find('._item_bokez');
        let pointsUI = parentUI.find('._points_bokez span');

        itemsUI.filter('._item_current_bokez').removeClass('_item_current_bokez');
        pointsUI.filter('._current_point_bokez').removeClass('_current_point_bokez');

        if( newAtts.items.length > prevAtts.items.length ){
            itemsUI.filter(':last').addClass('_item_current_bokez');
            pointsUI.filter(':last').addClass('_current_point_bokez');
        }
        else{
            itemsUI.filter(':first').addClass('_item_current_bokez');
            pointsUI.filter(':first').addClass('_current_point_bokez');
        }

    }

    /**
     * Creates UI Points markup
     * @return {String}
     */
    renderPoints(){

        let self = this;
        
        const { 
            itemsJson,
            pointsColor,
            showPoints,
        } = self.props.attributes
        
        let items = JSON.parse( itemsJson );

        if( items.length < 2 ) return null;
        if( ! showPoints ) return null;

        /**
         * On Point Click
         * @param {object} event 
         */
        const pointClick = ( event ) => {
            
            let self = jQuery( event.currentTarget );

            if( self.hasClass('_current_point_bokez') ) return;

            let uiParent = self.closest('.bokez-testimonials');
            let uiItems = jQuery( '._item_bokez', uiParent );

            uiItems.filter('._item_current_bokez').removeClass('_item_current_bokez');
            uiItems.eq( self.attr('data-index') ).addClass('_item_current_bokez');
            
            uiParent.find('._current_point_bokez').removeClass('_current_point_bokez');
            self.addClass('_current_point_bokez');
        
        };

        const points = items.map( ( item, index ) => {

            return (
                <span 
                    style = {{ 'background-color' : pointsColor }}
                    data-index = { index }
                    className = { index === 0 ? '_current_point_bokez' : '' }
                    onClick = { pointClick }
                ></span>
            );

        });

        return ( <div className = {'_points_bokez'} >{ points }</div> );

    }

    /**
     * Creates Testimonial Arrows markup
     * @return {String} 
     */
    renderArrows(){

        let self = this;
        
        const { 
            itemsJson,
            showArrows,
            arrowsColor,
        } = self.props.attributes
        
        let items = JSON.parse( itemsJson );

        if( items.length < 2 ) return null;
        if( ! showArrows ) return null;

        /**
         * Arrow Click Event
         * @param {object} event 
         */
        const arrowClick = ( event ) => {

            let self = jQuery( event.currentTarget );
            let uiParent = jQuery( event.currentTarget ).parents('.bokez-testimonials');
            let uiItems = jQuery( '._item_bokez', uiParent );
            let uiCurrentItem = jQuery( '._item_bokez._item_current_bokez', uiParent );
            let uiPoints = jQuery( '._points_bokez span', uiParent );
            let uiNext = null;
            let uiNextPoint = null;

            uiCurrentItem.removeClass('_item_current_bokez');
            uiPoints.filter('._current_point_bokez').removeClass();

            if( self.is('._arrow_left_bokez') ){

                uiNext = uiItems.eq( parseInt( uiCurrentItem.attr('data-id') ) - 1 );
                uiNextPoint = uiPoints.eq( parseInt( uiCurrentItem.attr('data-id') ) - 1 );
    
                if( uiNext.length ){
                    uiNext.addClass('_item_current_bokez');
                    uiNextPoint.addClass('_current_point_bokez');
                }
                else{
                    jQuery( '._item_bokez:last', uiParent ).addClass('_item_current_bokez');
                    uiPoints.filter(':last').addClass('_current_point_bokez');
                }

            }
            else{
                uiNext = uiItems.eq( parseInt( uiCurrentItem.attr('data-id') ) + 1 );
                uiNextPoint = uiPoints.eq( parseInt( uiCurrentItem.attr('data-id') ) + 1 );
    
                if( uiNext.length ){
                    uiNext.addClass('_item_current_bokez');
                    uiNextPoint.addClass('_current_point_bokez');
                }
                else{
                    jQuery( '._item_bokez:first', uiParent ).addClass('_item_current_bokez');
                    uiPoints.filter(':first').addClass('_current_point_bokez');
                }
            }

        }

        return (
            <Fragment>
                
                <div 
                    style = {{
                        'fill' : arrowsColor
                    }}
                    className = { '_arrow_left_bokez' } 
                    onClick = { arrowClick }
                ><ArrowLeftIcon fill = { arrowsColor } /></div>
                
                <div 
                    style = {{
                        'fill' : arrowsColor
                    }}
                    className = { '_arrow_right_bokez' } 
                    onClick = { arrowClick }
                ><ArrowRightIcon fill = { arrowsColor } /></div>

            </Fragment>
        );
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
        } = self.props
    
        const { 
            items,
            itemsJson,
            backgroundColor,
            textColor,
            alignment,
            pointsColor,
            arrowsColor,
            showPoints,
            showArrows,
        } = attributes
        
        /**
         * Create items ui
         */
        const rows = JSON.parse( itemsJson ).map( ( item, index ) => {
            
            return (

                <div 
                    key = { index }
                    data-id = { index } 
                    className = { '_item_bokez' + ( index === 0 ? ' _item_current_bokez' : '' ) } 
                >
                    
                    <div className = { '_item_controls_bokez' }>

                        <span 
                            onClick = { self.removeItem } 
                            data-index = { index } 
                        ><DeleteIcon/></span>
                                        
                    </div>

                    <MediaUpload
                        className = {'bokez-cover-upload'}
                        onSelect = { ( media ) => {
                            self.updateItem( media.url, index, 'imageUrl' );
                            self.updateItem( media.id, index, 'imageID' );
                        }}
                        type = { 'image' }
                        value = { item.imageID }
                        render = { function( obj ) {
                            return (

                                ! item.imageUrl ? (
                                    <Button
                                        className = { item.imageID ? '' : 'button-bokez-image-add button button-large' }
                                        onClick = { obj.open } 
                                    >
                                        <UploadImageIcon/>
                                    </Button>
                                ) : (
            
                                    <div className = { '_item_avatar_wrapper_bokez' } >

                                        <div className = { '_item_avatar_bokez' } >
                                            <img src = { item.imageUrl } onClick = { obj.open }  />
                                        </div>
                                    </div>

                                )

                            )
                        } }
                    />
                    
                    <RichText      
                        className = { '_item_name_bokez' }
                        formattingControls = {[]}
                        format = { 'string' }  
                        value = { item.name }
                        placeholder = { item.name }
                        tagName = { 'h3' }
                        keepPlaceholderOnFocus = { true }
                        onChange = { ( newValue ) => self.updateItem( newValue, index, 'name' ) }
                        unstableOnSplit = { () => null }
                    />

                    <RichText        
                        className = { '_item_job_bokez' }
                        formattingControls = {[]}
                        format = { 'string' }               
                        value = { item.job }
                        placeholder = { item.job }
                        tagName = { 'span' }
                        keepPlaceholderOnFocus = { true }
                        onChange = { ( newValue ) => self.updateItem( newValue, index, 'job' ) }
                        unstableOnSplit = { () => null }
                    />

                    <RichText        
                        className = { '_item_message_bokez' }
                        format = { 'string' }               
                        value = { item.message }
                        placeholder = { item.message }
                        tagName = { 'p' }
                        keepPlaceholderOnFocus = { true }
                        onChange = { ( newValue ) => self.updateItem( newValue, index, 'message' ) }
                        unstableOnSplit = { () => null }
                    />

                </div>

            )
        });

        return [

            isSelected && (
                
                <BlockControls key = { 'controls' }>
                
                    <AlignmentToolbar
                        value={alignment}
                        onChange={ ( nextAlign ) => setAttributes( { alignment: nextAlign } ) }
                    />
    
                </BlockControls>
    
            ),
    
            isSelected && (
    
                <InspectorControls key = {'inspector'} > 
    
                    <hr/>
                
                    <ToggleControl
                        label = { __( 'Show Arrows' , 'bokez') }
                        checked = { showArrows }
                        onChange = { ( value ) => setAttributes( { showArrows: value } ) }
                    />
    
                    <ToggleControl
                        label = { __( 'Show Points' , 'bokez') }
                        checked = { showPoints }
                        onChange = { ( value ) => setAttributes( { showPoints: value } ) }
                    />
    
                    <PanelColorSettings 
                        title = { __( 'Background Color' , 'bokez') } 
                        initialOpen = { false } 
                        colorValue = { backgroundColor } 
        				colorSettings={ [ {
                            value: backgroundColor,
                            colors: bokez.colors,
                            label: __( 'Background Color' , 'bokez'),
                            onChange: ( newColor ) => setAttributes( { backgroundColor: newColor } ),
                        } ] } >
    
                    </PanelColorSettings>
    
                    <PanelColorSettings 
                        title = { __( 'Text Color' , 'bokez') } 
                        initialOpen = { false } 
                        colorValue = { textColor } 
                        colorSettings={ [ {
                            value: textColor,
                            colors: bokez.colors,
                            label: __( 'Text Color' , 'bokez'),
                            onChange: ( newColor ) => setAttributes( { textColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                    <PanelColorSettings 
                        title = { __( 'Arrows Color' , 'bokez') } 
                        initialOpen = { false } 
                        colorValue = { arrowsColor } 
                        colorSettings={ [ {
                            value: arrowsColor,
                            colors: bokez.colors,
                            label: __( 'Arrows Color' , 'bokez'),
                            onChange: ( newColor ) => setAttributes( { arrowsColor: newColor } ),
                        } ] } >
    
                    </PanelColorSettings>
    
                    <PanelColorSettings 
                        title = { __( 'Points Color' , 'bokez') } 
                        initialOpen = { false } 
                        colorValue = { pointsColor } 
                        colorSettings={ [ {
                            value: pointsColor,
                            colors: bokez.colors,
                            label: __( 'Points Color' , 'bokez'),
                            onChange: ( newColor ) => setAttributes( { pointsColor: newColor } ),
                        } ] } >
    
                    </PanelColorSettings>
    
                </InspectorControls>
    
            ),
    
            <div 
                key={ 'testimonials' } 
                className={ 'bokez-block bokez-testimonials' } 
                style = {{ 
                    'text-align' : alignment,
                    'background-color' : backgroundColor,
                    'color' : textColor,
                }} 
            >

                { rows }
    
                { self.renderPoints() }

                { self.renderArrows() }
    
            </div>,
    
            isSelected && (
                <div className = { 'bokez-testimonial-item-add-wrapper' }>
                    <button 
                        className = { 'button button-primary' } 
                        onClick = { self.addItem } 
                    >
                        { __('Add Item', 'bokez') }
                    </button>
                </div>
            )
            
        ];
    };
}