
function TypeTemplate() {
    return function TypeTemplateDecorator(klass: any) {
        return klass
    }
}

function ServiceTemplate(klass: any) {
    return function ServiceTemplateDecorator(klass: any) {

    }
}

const typeParameterKey = Symbol("TypeParameter")

function TypeParameter() {
    return (
        (target: Object, propertyKey: string) => {
    }
        Reflect.defineMetadata()
    );
    Reflect.metadata(Symbol('asdf'), "asdf");
}

it('should decorator metadata', () => {
    @TypeTemplate()
    class Test {
        @TypeParameter() 
        parameter: string;
    }
    
    
});
