import $ from "jquery";

/**
 * ajax
 *
 **/
export default  function ajax(options) {
    options.url = options.url || '';
    options.type = options.type || 'POST';
    options.data = options.data || {};
    options.dataType = options.dataType || 'json';

    // 异步
    options.async === false ? options.async = false : options.async = true;
    let headers = {}, headersType = options.headers || true;

    if (headersType) {
        headers = Object.assign({}, headers, options.headers);
    }

    $.ajax({
        url: options.url,
        type: options.type,
        data: options.data,
        dataType: options.dataType,
        async: options.async,
        headers: headers,

        success: function (data) {
            // 未登录
            if (options && typeof options.success === 'function') {
                options.success(data);
            }
        },
        error: function (error) {
            if (options && typeof options.error === 'function') {
                options.error(error);
            }
        }
    });
}
