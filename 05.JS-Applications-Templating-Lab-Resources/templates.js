(function(scope) {
    const getTemplateString  = async(name) => {
        const path = `./templates/${name}-template.hbs`;
        const response = await fetch(path);
        return await response.text();
    }

    const getTemplateFunc = async(name) => {
        const templateString = await getTemplateString(name);
        return Handlebars.compile(templateString);
    }
    scope.templates = {getTemplateFunc, getTemplateString};
}(window));
