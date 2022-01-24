// babel plugin
// удаляет статические свойства объектов и JSX пропсы в компонентах по указанным именам в свойствах
// Возможно добавить поддержку также значения свойства (если оно литерал - не динамическое),
// однако сейчас поиск происходит только по имени свойства
//
module.exports = function() {
    return {
        visitor: {
            Program(programPath, state) {
                // Какие свойства нужно удалить? массив строк/regExp
                const properties = state.opts.properties || [];

                // Использовать ли логирование
                // Бабель кеширует скомпилированные файлы, так что логирование не всегда происходит
                const { hasLogging } = state.opts;
                if (!properties.length) return;

                programPath.traverse({
                    ObjectProperty(path) {
                        const propertyKey = path.node.key.value;
                        if (!propertyKey) return;

                        const propertyValueNode = path.node.value;
                        if (!propertyValueNode) return;

                        const propertyValue = propertyValueNode.value;

                        properties.forEach((property) => {
                            const regularExpressionMatch = property instanceof RegExp && property.test(propertyKey);
                            const stringMatch = property === propertyKey;

                            if (regularExpressionMatch || stringMatch) {
                                path.remove();

                                if (!hasLogging) return;
                                if (propertyValueNode.type == 'StringLiteral') {
                                    console.log('removing ObjectProperty', propertyKey, propertyValue);
                                } else {
                                    console.log('ObjectProperty', propertyKey, `<${propertyValueNode.type}>`);
                                }
                            }
                        });
                    },
                    JSXAttribute(path) {
                        const attributeKey = path.node.name.name;
                        if (!attributeKey) return;

                        const attributeValueNode = path.node.value;
                        if (!attributeValueNode) return;

                        const attributeValue = attributeValueNode.value;

                        properties.forEach((property) => {
                            const regularExpressionMatch = property instanceof RegExp && property.test(attributeKey);
                            const stringMatch = property === attributeKey;

                            if (regularExpressionMatch || stringMatch) {
                                path.remove();

                                if (!hasLogging) return;
                                if (attributeValueNode.type == 'StringLiteral') {
                                    console.log('removing JSXAttribute', attributeKey, attributeValue);
                                } else {
                                    console.log('removing JSXAttribute', attributeKey, `<${attributeValueNode.type}>`);
                                }
                            }
                        })
                    },
                });
            },
        },
    };
}