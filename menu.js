function SplitMenu( domId ){   
    
    /* Modes */
    
    this.MODE_SINGLE = 0;
    this.MODE_VERTICAL = 1;
    this.MODE_HORIZONTAL = 2;
    this.MODE_PIP = 3;
    
    /* Set up menu items */
    
    function SplitMenuItem( meta ){
        this.description = meta.description;
        this.className = meta.className;
        this.mode = meta.mode;
    }
    
    this.menuItems = [];
    
    var single = { description: 'Single Page', 
                   className: 'core-sprite-page', 
                   mode: this.MODE_SINGLE };
    
    var vertical = { description: 'Vertical Split', 
                     className: 'core-sprite-vertical', 
                     mode: this.MODE_VERTICAL };
    
    var horizontal = { description: 'Horizontal Split', 
                       className: 'core-sprite-horizontal', 
                       mode: this.MODE_HORIZONTAL };
    
    var pip = { description: 'Picture in Picture', 
                className:'core-sprite-pip', 
                mode: this.MODE_PIP };
    
    this.menuItems[ this.MODE_SINGLE ] = new SplitMenuItem( single );
    this.menuItems[ this.MODE_VERTICAL ] = new SplitMenuItem( vertical );
    this.menuItems[ this.MODE_HORIZONTAL ] = new SplitMenuItem( horizontal );
    this.menuItems[ this.MODE_PIP ] = new SplitMenuItem( pip );
    
    this.chosenMode =  this.MODE_SINGLE;
    
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
