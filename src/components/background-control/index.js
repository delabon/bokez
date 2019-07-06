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
                        label = { __('Choose orientation', 'bokez') }
                        value= { gradient_orientation }
                        options={ [
                            { label: __('Bottom Left to Top Right', 'bokez'), value: 'to right top' },
                            { label: __('Left to Right', 'bokez'), value: 'to right' },
                            { label: __('Top Left to Bottom Right', 'bokez'), value: 'to right bottom' },
                            { label: __('Top to Bottom', 'bokez'), value: 'to bottom' },
                            { label: __('Top Right to Bottom Left', 'bokez'), value: 'to left bottom' },
                            { label: __('Right to Left', 'bokez'), value: 'to left' },
                            { label: __('Bottom Right to Top Left', 'bokez'), value: 'to left top' },
                            { label: __('Bottom to Top', 'bokez'), value: 'to top' },
                        ] }
                        onChange={ onGradientOrientationChange }
                    />

                    <ColorControl
                        label = { __('From', 'bokez') }
                        value = { gradient_from }
                        onChange = { onGradientFromChange }
                    />

                    <ColorControl
                        label = { __('To', 'bokez') }
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
                                            {__('Select Image', 'bokez')}
                                        </Button>

                                        <Button
                                            className = { 'button' }
                                            onClick = { _self.props.onImageRemove } 
                                        >
                                            {__('Remove Image', 'bokez')}
                                        </Button>

                                    </Fragment>
                                ]
                            } }
                        />
                    </div>

                    <SelectControl
                        label = { __('Image Size', 'bokez') }
                        value= { _self.props.image_size }
                        options={ [
                            { label: __('Cover', 'bokez'), value: 'cover' },
                            { label: __('Contain', 'bokez'), value: 'contain' },
                            { label: __('Auto', 'bokez'), value: 'auto' },
                        ] }
                        onChange={ _self.props.onImageSizeChange }
                    />

                    <SelectControl
                        label = { __('Image Position', 'bokez') }
                        value= { _self.props.image_position }
                        options={ [
                            { label: __('Center Center', 'bokez'), value: 'center center' },
                            { label: __('Center Top', 'bokez'), value: 'center top' },
                            { label: __('Center Bottom', 'bokez'), value: 'center bottom' },
                            { label: __('Left Top', 'bokez'), value: 'left top' },
                            { label: __('Left Center', 'bokez'), value: 'left center' },
                            { label: __('Left Bottom', 'bokez'), value: 'left bottom' },
                            { label: __('Right Top', 'bokez'), value: 'right top' },
                            { label: __('Right Center', 'bokez'), value: 'right center' },
                            { label: __('Right Bottom', 'bokez'), value: 'right bottom' },
                        ] }
                        onChange={ _self.props.onImagePositionChange }
                    />
                       
                    <SelectControl
                        label = { __('Image Repeat', 'bokez') }
                        value= { _self.props.image_repeat }
                        options={ [
                            { label: __('No Repeat', 'bokez'), value: 'no-repeat' },
                            { label: __('Repeat', 'bokez'), value: 'repeat' },
                            { label: __('Repeat-x', 'bokez'), value: 'repeat-x' },
                            { label: __('Repeat-y', 'bokez'), value: 'repeat-y' },
                        ] }
                        onChange={ _self.props.onImageRepeatChange }
                    />

                    <SelectControl
                        label = { __('Image Attachment', 'bokez') }
                        value= { _self.props.image_attachment }
                        options={ [
                            { label: __('Fixed', 'bokez'), value: 'fixed' },
                            { label: __('Scroll', 'bokez'), value: 'scroll' },
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
                            title: __('Color', 'bokez'),
                            className: 'bokez-color-tab',
                        },
                        {
                            name: 'gradient',
                            title: __('Gradient', 'bokez'),
                            className: 'bokez-gradient-tab',
                        },
                        {
                            name: 'image',
                            title: __('Image', 'bokez'),
                            className: 'bokez-image-tab',
                        },
                    ] }
                >
                    {( tab ) => {
                        return <div>{ this.getOptionsByType() }</div>
                    }}
                </TabPanel>

                <ColorControl
                    label = { this.props.type == 'color' ? __('Color', 'bokez') : __('Fallback Color', 'bokez') }
                    value = { color }
                    onChange = { onColorChange }
                />

            </div>
        );
    }
}

