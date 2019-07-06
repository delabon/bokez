import { bokez } from '../../global'
import { DeleteIcon } from '../../icons';

const { __ } = wp.i18n;
const { Component } = wp.element;

const {
    PanelColorSettings,
    InspectorControls, 
    AlignmentToolbar, 
    BlockControls,
    RichText,
} = wp.editor;

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

        this.props.setAttributes({
            'itemsJson': JSON.stringify( data.concat([{ header: 'New Header', body: 'New Body' }]) )
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

    render(){
        let self = this;

        const { 
            className,
            attributes,
            setAttributes, 
            isSelected, 
        } = self.props
    
        const { 
            items,
            itemsJson,
            alignment,
            headerTextColor,
            headerBgColor,
            bodyBgColor,
            bodyTextColor,
        } = attributes

        const rows = JSON.parse( itemsJson ).map( ( item, index ) => {
    
            return (
    
                <div 
                    key = { index }
                    data-id = { index } 
                    className = { 'bokez-accordion-item' } 
                    onClick = { ( event ) => { 
                        jQuery('.bokez-accordion .bokez-accordion-item').removeClass('_active_bokez');
                        jQuery( event.currentTarget ).addClass('_active_bokez');
                    } } >
                    
                    <div className = { '_item_controls_bokez' }>
    
                        <span onClick = { self.removeItem } data-index = { index } ><DeleteIcon/></span>
                                        
                    </div>
    
                    <RichText      
                        style = {{ 'background-color' : headerBgColor, 'color' : headerTextColor }}
                        className = { '_item_header_bokez' }
                        formattingControls = {[]}
                        format = { 'string' }               
                        value = { item.header }
                        placeholder = { item.header }
                        tagName = { 'span' }
                        keepPlaceholderOnFocus = { true }
                        onChange = { ( newValue ) => self.updateItem( newValue, index, 'header' ) }
                        onSplit = { () => null }
                    />
    
                    <RichText        
                        style = {{ 'background-color' : bodyBgColor, 'color' : bodyTextColor }}
                        className = { '_item_body_bokez' }
                        format = { 'string' }               
                        value = { item.body }
                        placeholder = { item.body }
                        tagName = { 'p' }
                        keepPlaceholderOnFocus = { true }
                        onChange = { ( newValue ) => self.updateItem( newValue, index, 'body' ) }
                        onSplit = { () => null }
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
    
                    <PanelColorSettings 
                        title = { __( 'Header Background Color' , 'bokez') } 
                        initialOpen = { false } 
                        colorValue = { headerBgColor } 
                        colorSettings={ [ {
                                value: headerBgColor,
                                colors: bokez.colors,
                                label: __( 'Header Background Color' , 'bokez'),
                                onChange: ( newColor ) => setAttributes( { headerBgColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                    <PanelColorSettings 
                        title = { __( 'Header Text Color' , 'bokez') } 
                        initialOpen = { false } 
                        colorValue = { headerTextColor } 
                        colorSettings={ [ {
                                value: headerTextColor,
                                colors: bokez.colors,
                                label: __( 'Header Text Color' , 'bokez'),
                                onChange: ( newColor ) => setAttributes( { headerTextColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                    <PanelColorSettings 
                        title = { __( 'Body Background Color' , 'bokez') } 
                        initialOpen = { false } 
                        colorValue = { bodyBgColor }
                        colorSettings={ [ {
                                value: bodyBgColor,
                                colors: bokez.colors,
                                label: __( 'Body Background Color' , 'bokez'),
                                onChange: ( newColor ) => setAttributes( { bodyBgColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                    <PanelColorSettings 
                        title = { __( 'Body Text Color' , 'bokez') } 
                        initialOpen = { false } 
                        colorValue = { bodyTextColor }
                        colorSettings={ [ {
                            value: bodyTextColor,
                            colors: bokez.colors,
                            label: __( 'Body Text Color' , 'bokez'),
                            onChange: ( newColor ) => setAttributes( { bodyTextColor: newColor } ),
                    } ] } >
                    </PanelColorSettings>
    
                </InspectorControls>
    
            ),
    
            <div key = {'bokez-accordion'} className = { className + ' bokez-block bokez-accordion bokez-accordion-' + alignment } style = {{ 'text-align': alignment }} >
                { rows }
            </div>,
    
            isSelected && (
                <div className = { 'bokez-accordion-item-add-wrapper' }>
                    <button 
                        className = { 'button button-primary' } 
                        onClick = { self.addItem } 
                    >
                        { __('Add Item', 'bokez') }
                    </button>
                </div>
            )
    
        ];
    }

}
