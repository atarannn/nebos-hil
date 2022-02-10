 var smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
var settings = {
    outputStyle: 'scss', /* less || scss || sass || styl */
    columns: 6, /* number of grid columns */
    offset: '60px', /* gutter width px || % || rem */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    fields: '100px',
    container: {
        maxWidth: '1360px', /* max-width оn very large screen */
        fields: '100px' /* side fields */
    },
    breakPoints: {
        llg: {
          w
            idth: '1600px',
          offset: '40px',
            fields: '70px',
        },
        lg: {
            width: '1024px',
            offset: '12px',
            fields: '40px',
        },
        xs: {
            width: '575px',
            offset: '40px',
            fields: '20px',
        }
        /*
        We can create any quantity of break points.

        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};

smartgrid('./src/assets/styles/assets', settings);
