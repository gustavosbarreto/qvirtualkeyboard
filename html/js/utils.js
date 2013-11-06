function isSpecialKey(key) {
    return !/^[a-z\u00C0-\u00ff]+$/.test(key);
}
