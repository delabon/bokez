import { bokez } from '../../global';
import { DeleteIcon, UploadImageIcon } from '../../icons';

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

const {
    PanelColorSettings,
    InspectorControls, 
    RichText,
    MediaUpload,
    URLInput,   
} = wp.editor;

const { 
    Button,
	Dashicon,    
} = wp.components;

/**
 * HTML Style
 * @param {Object} attributes 
 */
export const styleGen = ( attributes ) => {
    
    const { 
        ID,
        backgroundColor,
        titleColor,    
        featuresColor,
        priceColor,
        buttonColor,
        buttonBGColor,
        buttonColorHover
    } = attributes;

    return (
        
        <style>{`
            #${ID} ._item_bokez {
                background-color: ${ backgroundColor ? backgroundColor : '' };
            }

            #${ID} ._item_header_bokez {
                color: ${ titleColor ? titleColor : '' };
            }

            #${ID} ._item_features_bokez {
                color: ${ featuresColor ? featuresColor : '' };
            }

            #${ID} ._item_features_bokez li {
                border-color: ${ featuresColor ? featuresColor : '' };
            }

            #${ID} ._item_price_bokez {
                color: ${ priceColor ? priceColor : '' };
            }

            #${ID} ._item_button_bokez {
                color: ${ buttonColor ? buttonColor : '' };
                border-color: ${ buttonColor ? buttonColor : '' };
            }

            #${ID} ._item_button_bokez:hover {
                background-color: ${ buttonBGColor ? buttonBGColor : '' };
                border-color: ${ buttonBGColor ? buttonBGColor : '' };
                color: ${ buttonColorHover ? buttonColorHover : '' };
            }
        `}</style>

    );
}

export class Edit extends Component{

    /**
     * Adds new item to the items array
     */
    addItem(){

        let data = JSON.parse( this.props.attributes.itemsJson );

        if( data.length == 4 ) return;

        this.props.setAttributes({
            'itemsJson': JSON.stringify( data.concat(
                [{
                    imageUrl: '',
                    imageID: 0,
                    header: 'ENTERPRISE',
                    features:`
                            <li>Custom Domains</li> 
                            <li>5 Users</li>
                            <li>10 Projects</li>
                    `,
                    price: '$199',
                    buttonName: 'Free Trial',
                    buttonUrl: 'http://delabon.com/',
                }]
            ))
        });
    }

    render(){

        let self = this;

        const { 
            isSelected, 
            setAttributes, 
            attributes,
        } = self.props;
    
        const { 
            ID,
            imageUrl,
            imageID,
            header,
            features,
            price,
            buttonName,
            buttonUrl,
            backgroundColor,
            titleColor,    
            featuresColor,
            priceColor,
            buttonColor,
            buttonBGColor,
            buttonColorHover,
        } = attributes;
    
        if( ID === '' ){
            setAttributes({ ID : bokez.uniqueID() });
        }
        
        return [
    
            isSelected && (
    
                <InspectorControls key = {'inspector'} > 
    
                    <hr/>
                
                    <PanelColorSettings 
                        title = { __( 'Background Color' ) } 
                        initialOpen = { false } 
                        colorValue = { backgroundColor } 
                        colorSettings={ [ {
                                value: backgroundColor,
                                colors: bokez.colors,
                                label: __( 'Background Color' ),
                                onChange: ( newColor ) => setAttributes( { backgroundColor: newColor } ),
                        } ] } >
    
                    </PanelColorSettings>
    
                    <PanelColorSettings 
                        title = { __( 'Title Color' ) } 
                        initialOpen = { false } 
                        colorValue = { titleColor } 
                        colorSettings={ [ {
                                value: titleColor,
                                colors: bokez.colors,
                                label: __( 'Title Color' ),
                                onChange: ( newColor ) => setAttributes( { titleColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                    <PanelColorSettings 
                        title = { __( 'Features Color' ) } 
                        initialOpen = { false } 
                        colorValue = { featuresColor }
                        colorSettings={ [ {
                                value: featuresColor,
                                colors: bokez.colors,
                                label: __( 'Features Color' ),
                                onChange: ( newColor ) => setAttributes( { featuresColor: newColor } ),
                        } ] } >
    
                    </PanelColorSettings>
    
                    <PanelColorSettings 
                        title = { __( 'Price Color' ) } 
                        initialOpen = { false } 
                        colorValue = { priceColor }
                        colorSettings={ [ {
                                value: priceColor,
                                colors: bokez.colors,
                                label: __( 'Price Color' ),
                                onChange: ( newColor ) => setAttributes( { priceColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                    <PanelColorSettings 
                        title = { __( 'Button Color' ) } 
                        initialOpen = { false } 
                        colorValue = { buttonColor } 
                        colorSettings={ [ {
                                value: buttonColor,
                                colors: bokez.colors,
                                label: __( 'Button Color' ),
                                onChange: ( newColor ) => setAttributes( { buttonColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                    <PanelColorSettings 
                        title = { __( 'Button Background Color ( Hover )' ) } 
                        initialOpen = { false } 
                        colorValue = { buttonBGColor }
                        colorSettings={ [ {
                                value: buttonBGColor,
                                colors: bokez.colors,
                                label: __( 'Button Background Color ( Hover )' ),
                                onChange: ( newColor ) => setAttributes( { buttonBGColor: newColor } ),
                        } ] } >
    
                    </PanelColorSettings>
    
                    <PanelColorSettings 
                        title = { __( 'Button Color ( Hover )' ) } 
                        initialOpen = { false } 
                        colorValue = { buttonColorHover } 
                        colorSettings={ [ {
                                value: buttonColorHover,
                                colors: bokez.colors,
                                label: __( 'Button Color ( Hover )' ),
                                onChange: ( newColor ) => setAttributes( { buttonColorHover: newColor } ),
                        } ] } >
    
                    </PanelColorSettings>
    
                </InspectorControls>
    
            ),
    
            <Fragment>
                
                { styleGen( attributes ) }

                <div 
                    key = { 'pricing-table' }
                    id = { ID }
                    className = { 'bokez-block bokez-pricing-table' }
                >

                    <div className="_item_bokez">
                    
                        <MediaUpload
                            className = {'bokez-cover-upload'}
                            onSelect = { ( media ) => {
                                return setAttributes({
                                    imageUrl: media.url,
                                    imageID: media.id,
                                })
                            }}
                            type = { 'image' }
                            value = { imageID }
                            render = { function( obj ) {
                                return (

                                    ! imageUrl ? (
                                        <Button
                                            className = { imageID ? '' : 'button-bokez-image-add button button-large' }
                                            onClick = { obj.open } 
                                        >
                                            <UploadImageIcon/>
                                        </Button>
                                    ) : (
                
                                        <div className = { '_item_avatar_wrapper_bokez' } >

                                            <div className = { '_item_avatar_bokez' } >
                                                <img src = { imageUrl } onClick = { obj.open }  />
                                            </div>
                                        </div>

                                    )

                                )
                            } }
                        />
                        
                        <RichText      
                            className = { '_item_header_bokez' }
                            formattingControls = {[]}
                            format = { 'string' }  
                            value = { header }
                            placeholder = { header }
                            tagName = { 'h3' }
                            keepPlaceholderOnFocus = { true }
                            onChange = { ( newValue ) => setAttributes({ header: newValue }) }
                            onSplit = { () => null }
                        />
        
                        <RichText        
                            className = { '_item_features_bokez' }
                            format = { 'string' }               
                            value = { features }
                            placeholder = { features }
                            tagName = { 'ul' }
                            multiline = { 'li' }
                            keepPlaceholderOnFocus = { true }
                            onChange = { ( newValue ) => setAttributes({ features: newValue }) }
                        />
        
                        <RichText        
                            className = { '_item_price_bokez' }
                            formattingControls = {[]}
                            format = { 'string' }               
                            value = { price }
                            placeholder = { price }
                            tagName = { 'span' }
                            keepPlaceholderOnFocus = { true }
                            onChange = { ( newValue ) => setAttributes({ price: newValue }) }
                            onSplit = { () => null }
                        />
        
                        <RichText        
                            className = { '_item_button_bokez' }
                            formattingControls = {[]}
                            format = { 'string' }               
                            value = { buttonName }
                            placeholder = { buttonName }
                            tagName = { 'a' }
                            keepPlaceholderOnFocus = { true }
                            onChange = { ( newValue ) => setAttributes({ buttonName: newValue }) }
                            onSplit = { () => null }
                            href = { buttonUrl }
                            onClick = { ( event ) => event.preventDefault() }
                        />
                        
                        <form
                            key={ 'form-link' }
                            onSubmit={ ( event ) => event.preventDefault() }
                            className={ 'bokez-block-form blocks-button__inline-link' }
                        >
                            <Dashicon icon={ 'admin-links' } />
                            <URLInput
                                value={ buttonUrl }
                                onChange = { ( newValue ) => setAttributes({ buttonUrl: newValue }) }
                            />
                        </form>

                    </div>
                </div>
            </Fragment>
            
        ];
    }

}

