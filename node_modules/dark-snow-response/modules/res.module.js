var provider = "Red Carpet Solutions";
var _warnings = [];

module.exports.setProvider = (providername) => {
    provider = providername;
}
module.exports.setWarnings = (warnings) => {
    _warnings.push(warnings);
}

module.exports.json = (res, data, warnings) => {
    res.set('Content-Type', 'application/json');
    let _warn = new Array();
    _warn.push(..._warnings);
    if (warnings) {
        _warn.push(warnings);
    }
    res.status(200).send({
        "data": data,
        "warnings": _warn,
        "status": 200,
        "provider": provider
    });
}


module.exports.created = (res, data, warnings) => {
    res.set('Content-Type', 'application/json');
    let _warn = new Array();
    _warn.push(..._warnings);
    if (warnings) {
        _warn.push(warnings);
    }
    res.status(201).send({
        "data": data,
        "warnings": _warnings,
        "status": 201,
        "provider": provider
    });
}

module.exports.accepted = (res, data, warnings) => {
    res.set('Content-Type', 'application/json');
    let _warn = new Array();
    _warn.push(..._warnings);
    if (warnings) {
        _warn.push(warnings);
    }
    res.status(202).send({
        "data": data,
        "warnings": _warnings,
        "status": 202,
        "provider": provider
    });
}

module.exports.error = (res, err, warnings) => {
    if (!err) {
        err = "An Error has Occured, Please try again";
    }
    res.set('Content-Type', 'application/json');
    let _warn = new Array();
    _warn.push(..._warnings);
    if (warnings) {
        _warn.push(warnings);
    }
    res.status(500).send({
        "errors": err,
        "warnings": _warnings,
        "status": 500,
        "provider": provider
    });
}

module.exports.unauthorized = (res, err, warnings) => {
    if (!err) {
        err = "You are not Authorized to access this content";
    }
    res.set('Content-Type', 'application/json');
    let _warn = new Array();
    _warn.push(..._warnings);
    if (warnings) {
        _warn.push(warnings);
    }
    res.status(401).send({
        "errors": err,
        "warnings": _warnings,
        "status": 401,
        "provider": provider
    });
}

module.exports.badRequest = (res, err, warnings) => {
    if (!err) {
        err = "The Information you provided is incomplete";
    }
    res.set('Content-Type', 'application/json');
    let _warn = new Array();
    _warn.push(..._warnings);
    if (warnings) {
        _warn.push(warnings);
    }
    res.status(400).send({
        "errors": err,
        "warnings": _warnings,
        "status": 400,
        "provider": provider
    });
}