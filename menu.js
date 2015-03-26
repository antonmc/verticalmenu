function SplitMenu( domId ){   
    
    /* Modes */
    
    this.MODE_SINGLE_PAGE = 0;
    this.MODE_VERTICAL_SPLIT = 1;
    this.MODE_HORIZONTAL_SPLIT = 2;
    this.MODE_PICTURE_IN_PICTURE = 3;
    
    /* Set up menu items */
    
    function SplitMenuItem( description, cssClass, mode ){
        this.description = description;
        this.className = cssClass;
        this.mode = mode;
    }
    
    this.menuItems = [];
    
    this.menuItems[ this.MODE_SINGLE_PAGE ] = new SplitMenuItem( 'Single Page',
                                                                 'core-sprite-page',
                                                                 this.MODE_SINGLE_PAGE );

    this.menuItems[ this.MODE_VERTICAL_SPLIT ] = new SplitMenuItem( 'Vertical Split',
                                                                    'core-sprite-vertical',
                                                                    this.MODE_VERTICAL_SPLIT );

    this.menuItems[ this.MODE_HORIZONTAL_SPLIT ] = new SplitMenuItem( 'Horizontal Split',
                                                                      'core-sprite-horizontal',
                                                                      this.MODE_HORIZONTAL_SPLIT );

    this.menuItems[ this.MODE_PICTURE_IN_PICTURE ] = new SplitMenuItem( 'Picture in Picture',
                                                                        'core-sprite-pip',
                                                                        this.MODE_PICTURE_IN_PICTURE );
    
    this.chosenMode =  this.MODE_SINGLE_PAGE;
    
    /* Attach menu to anchor */
    
    var element = document.getElementById( domId );
    
    if( element ){
    
        this.anchor = element;
        
        var splitMenu = document.createElement( 'div' );
        splitMenu.className = 'splitMenuBox';
        
        this.currentModeElement = document.createElement( 'div' );
        this.currentModeElement.className = this.menuItems[ this.chosenMode ].className + " chosen";
        this.currentModeElement.onclick = this.toggleMenu.bind(this);
        
        this.selectionTable = document.createElement( 'div' );
        this.selectionTable.className = 'selectionTable';
        
        splitMenu.appendChild( this.currentModeElement );
        splitMenu.appendChild( this.selectionTable );
        this.anchor.appendChild( splitMenu );
        this.addMenuItems();
    }
}

function createMenuItem( data ){
    
    var item = document.createElement( 'div' );
    item.className = 'selectionItem';
    
    var selectionState = document.createElement( 'div' );
    selectionState.className = 'state';
    var icon = document.createElement( 'div' );
    var description = document.createElement( 'div' );
    description.className = 'description';
    
    icon.className = data.className;
    description.innerHTML = data.description;
    
    if( this.chosenMode === data.mode ){
        selectionState.className = 'core-sprite-checkmark state';   
    }
    
    item.appendChild( selectionState );
    item.appendChild( icon );
    item.appendChild( description );
    
    item.id = data.mode;
    
    item.onclick = this.switchMode.bind( this );
    
    return item;
}

SplitMenu.prototype.createMenuItem = createMenuItem;

function addMenuItems(){
    for( item in this.menuItems ){
        this.selectionTable.appendChild( this.createMenuItem(  this.menuItems[item] ) );
    }
}

SplitMenu.prototype.addMenuItems = addMenuItems;

function toggleMenu(){
    
    if( this.selectionTable.style.visibility === 'visible' ){
        this.selectionTable.style.visibility = 'collapse';
    }else{
        this.selectionTable.style.visibility = 'visible';
    }
}

SplitMenu.prototype.toggleMenu = toggleMenu;

function switchMode( mode ){
    
    var selection = mode.target.parentNode;
    
    if( selection.id ){
    
        this.chosenMode = parseInt( selection.id );

        while(this.selectionTable.firstChild ){
            this.selectionTable.removeChild( this.selectionTable.firstChild );
        }

        this.addMenuItems();

        this.toggleMenu();

        this.currentModeElement.className = this.menuItems[ this.chosenMode ].className + " chosen";
    }
}

SplitMenu.prototype.switchMode = switchMode;

function start(){    
    var splitMenu = new SplitMenu( 'splitmenu' );
}
