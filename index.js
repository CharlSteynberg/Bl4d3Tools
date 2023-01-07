
// Significant global shortcuts
// ----------------------------------------------------------------------------------------------------------------------------
    const Global = globalThis;
    const dump = console.log.bind(console);
// ----------------------------------------------------------------------------------------------------------------------------




// Select :: replacement for `document.querySelectorAll()`
// ----------------------------------------------------------------------------------------------------------------------------
    const Select = function Select (string)
    {
        return [].slice.call( document.querySelectorAll(string) );
    };
// ----------------------------------------------------------------------------------------------------------------------------




// Delete :: replacement for `foo.parentNode.removeChild(foo)`
// ----------------------------------------------------------------------------------------------------------------------------
    const Delete = function Delete (struct)
    {
        let format = (typeof struct);
        let search, object;
        let result = 0;

        if (format === "string")
        {
            search = Select(struct);
            for (object of search)
            {
                if (!object.parentNode){ continue };
                result ++;
                object.parentNode.removeChild(object)
            };

            return result;
        };


        if (!struct.parentNode){ return 0 };
        struct.parentNode.removeChild(struct)
        return 1;
    };
// ----------------------------------------------------------------------------------------------------------------------------




// Create :: replacement for `document.createElement()`
// ----------------------------------------------------------------------------------------------------------------------------
    const Create = function Create (struct)
    {
        let format = (typeof struct);
        let result, object, attrib;


        if (format === "string")
        {
            result = document.createElement(struct);
            return result;
        };


        if (format === "object")
        {
            object = struct.node;
            delete struct.node;

            result = document.createElement(object);
            attrib = Object.keys(struct);

            for (attrib in struct)
            {
                result.setAttribute(attrib, struct[attrib]);
            };

            return result;
        };
    };
// ----------------------------------------------------------------------------------------------------------------------------




// .Insert :: replacement for `.appendChild()`
// ----------------------------------------------------------------------------------------------------------------------------
    (()=>
    {
        let design = {configurable:false, enumerable:false, writeable:false, value:function Insert(struct)
        {
            this.appendChild(struct)
        }};

        Object.defineProperty(HTMLElement.prototype, "Insert", design);
    })();
// ----------------------------------------------------------------------------------------------------------------------------




// .Modify :: replacement for `.setAttribute()`
// ----------------------------------------------------------------------------------------------------------------------------
    (()=>
    {
        let design = {configurable:false, enumerable:false, writeable:false, value:function Modify(struct)
        {
            let attrib = Object.keys(struct);

            for (attrib in struct)
            {
                this.setAttribute(attrib, struct[attrib]);
            };
        }};

        Object.defineProperty(HTMLElement.prototype, "Modify", design);
    })();
// ----------------------------------------------------------------------------------------------------------------------------





// hack here
// ----------------------------------------------------------------------------------------------------------------------------
    let atr = {node:"textarea", id:"thing", class:"bonani"};
    let foo = Create( atr );
    foo.Modify( {class:"lusanda"} );

    Select("body")[0].Insert(foo);

    setTimeout( ()=>{ Delete(foo); }, 2000 );
// ----------------------------------------------------------------------------------------------------------------------------
