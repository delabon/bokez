import ColorControl from '../../components/color-control';

const {
    __, 
    _n, 
    sprintf
} = wp.i18n;

const {
    MediaUpload,
} = wp.editor;

const {
    SelectControl, 
    Button,
    CheckboxControl,
    TabPanel,
} = wp.components;

const {
    Component, 
    Fragment
} = wp.element;

export default class BackgroundControl extends Component {

    constructor() {
		super( ...arguments );
    
        this.getOptionsByType = this.getOptionsByType.bind( this );
    }
    
    getOptionsByType(){
        var _self = this;

        const { 
            gradient_orientation,
            onGradientOrientationChange,
            gradient_from,
            onGradientFromChange,
            gradient_to,
            onGradientToChange,
        } = _self.props;

        if( _self.props.type == 'gradient' ){
            return(
                <Fragment>
             
                    <SelectControl
                        label = { __('Choose orientation') }
                        value= { gradient_orientation }
                        options={ [
                            { label: __('Bottom Left to Top Right'), value: 'to right top' },
                            { label: __('Left to Right'), value: 'to right' },
                            { label: __('Top Left to Bottom Right'), value: 'to right bottom' },
                            { label: __('Top to Bottom'), value: 'to bottom' },
                            { label: __('Top Right to Bottom Left'), value: 'to left bottom' },
                            { label: __('Right to Left'), value: 'to left' },
                            { label: __('Bottom Right to Top Left'), value: 'to left top' },
                            { label: __('Bottom to Top'), value: 'to top' },
                        ] }
                        onChange={ onGradientOrientationChange }
                    />

                    <ColorControl
                        label = { __('From') }
                        value = { gradient_from }
                        onChange = { onGradientFromChange }
                    />

                    <ColorControl
                        label = { __('To') }
                        value = { gradient_to }
                        onChange = { onGradientToChange }
                    />
                       
                </Fragment>
            );
        }

        // background image
        else if( _self.props.type == 'image' ){
            return(
                <Fragment>
                    
                    <div className = {'dlb-component-upload'}>
                        <MediaUpload
                            className = {'dlb-component-upload'}
                            onSelect = { _self.props.onImageChange }
                            type = { 'image' }
                            value = { _self.props.image_url }
                            render = { function( obj ) {
                                return [
                                    <Fragment>
                                        {_self.props.image_url && (
                                            <img src={ _self.props.image_url } />
                                        )}

                                        <Button
                                            className = { 'button button-primary' }
                                            onClick = { obj.open } 
                                        >
                                            {__('Select Image')}
                                        </Button>

                                        <Button
                                            className = { 'button' }
                                            onClick = { _self.props.onImageRemove } 
                                        >
                                            {__('Remove Image')}
                                        </Button>

                                    </Fragment>
                                ]
                            } }
                        />
                    </div>

                    <SelectControl
                        label = { __('Image Size') }
                        value= { _self.props.image_size }
                        options={ [
                            { label: __('Cover'), value: 'cover' },
                            { label: __('Contain'), value: 'contain' },
                            { label: __('Auto'), value: 'auto' },
                        ] }
                        onChange={ _self.props.onImageSizeChange }
                    />

                    <SelectControl
                        label = { __('Image Position') }
                        value= { _self.props.image_position }
                        options={ [
                            { label: __('Center Center'), value: 'center center' },
                            { label: __('Center Top'), value: 'center top' },
                            { label: __('Center Bottom'), value: 'center bottom' },
                            { label: __('Left Top'), value: 'left top' },
                            { label: __('Left Center'), value: 'left center' },
                            { label: __('Left Bottom'), value: 'left bottom' },
                            { label: __('Right Top'), value: 'right top' },
                            { label: __('Right Center'), value: 'right center' },
                            { label: __('Right Bottom'), value: 'right bottom' },
                        ] }
                        onChange={ _self.props.onImagePositionChange }
                    />
                       
                    <SelectControl
                        label = { __('Image Repeat') }
                        value= { _self.props.image_repeat }
                        options={ [
                            { label: __('No Repeat'), value: 'no-repeat' },
                            { label: __('Repeat'), value: 'repeat' },
                            { label: __('Repeat-x'), value: 'repeat-x' },
                            { label: __('Repeat-y'), value: 'repeat-y' },
                        ] }
                        onChange={ _self.props.onImageRepeatChange }
                    />

                    <SelectControl
                        label = { __('Image Attachment') }
                        value= { _self.props.image_attachment }
                        options={ [
                            { label: __('Fixed'), value: 'fixed' },
                            { label: __('Scroll'), value: 'scroll' },
                        ] }
                        onChange={ _self.props.onImageAttachmentChange }
                    />

                </Fragment>
            );
        }

    }

    render() {
        
        const { 
            className = '',
            type, 
            onTypeChange,
            color,
            onColorChange,
        } = this.props;
        
        return (
            <div className={ `${className} dlb-background-controls` }>           

                <TabPanel 
                    className = "bokez-inspect-tabs"
                    activeClass = "bokez-active-tab"
                    initialTabName = { type }
                    onSelect = { onTypeChange }
                    tabs={ [
                        {
                            name: 'color',
                            title: __('Color'),
                            className: 'bokez-color-tab',
                        },
                        {
                            name: 'gradient',
                            title: __('Gradient'),
                            className: 'bokez-gradient-tab',
                        },
                        {
                            name: 'image',
                            title: __('Image'),
                            className: 'bokez-image-tab',
                        },
                    ] }
                >
                    {( tab ) => {
                        return <div>{ this.getOptionsByType() }</div>
                    }}
                </TabPanel>

                <ColorControl
                    label = { this.props.type == 'color' ? __('Color') : __('Fallback Color') }
                    value = { color }
                    onChange = { onColorChange }
                />

            </div>
        );
    }
}

