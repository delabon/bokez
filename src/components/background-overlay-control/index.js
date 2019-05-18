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

export default class BackgroundOverlayControl extends Component {

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

