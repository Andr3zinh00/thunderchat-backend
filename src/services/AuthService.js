
const find = (args, model) => {
    const exists = model.findOne({ ...args });

    return exists;
}

exports.getUser = find;

