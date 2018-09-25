const axios = require("axios");
const Account = require("./Account");
const Grade = require("./Grade");

module.exports = class {

    constructor() {
        this.api = axios;

        this.requestConfig = {
            headers: {
                "X-XSRF-TOKEN": "eyJpdiI6InozUzA2MllLc0dzXC9odldUZFIrXC9PZz09IiwidmFsdWUiOiJJNjV3OW9NWXlWRVpZYXN1MTIxd1RhZHE1VWtpSE5xZUZHXC9oQmxMKzlhTDJyQWFndWFlZkFIY2p3ZFhYckYzakh6NWlRemxxSzdEdlZ0SkNKbVwvbTBnPT0iLCJtYWMiOiI3MjExZDc0OTcyM2U1N2NiOGE2ZjE5ZDdkYjc2MWFmOTBiYTdhYWM3YjVkMjNiNGZkODdmMzJiNTZjM2FmMmQ4In0=",
                "Cookie": "XSRF-TOKEN=eyJpdiI6InozUzA2MllLc0dzXC9odldUZFIrXC9PZz09IiwidmFsdWUiOiJJNjV3OW9NWXlWRVpZYXN1MTIxd1RhZHE1VWtpSE5xZUZHXC9oQmxMKzlhTDJyQWFndWFlZkFIY2p3ZFhYckYzakh6NWlRemxxSzdEdlZ0SkNKbVwvbTBnPT0iLCJtYWMiOiI3MjExZDc0OTcyM2U1N2NiOGE2ZjE5ZDdkYjc2MWFmOTBiYTdhYWM3YjVkMjNiNGZkODdmMzJiNTZjM2FmMmQ4In0%3D; portal_librus_session=eyJpdiI6Ik52aVlNN2J4TUYzWEdwblJyVFczZnc9PSIsInZhbHVlIjoiaTZ3ajhuRGNhYit1VUdDUXZ3MnlNMURmUDd3WXFYcDMrSzlxS3FnTlgyUzlVRk5JeXpnS0lyTmN0MkRSYjc2RWpCMTlpcGdkdmRkcmhwRkhGbStod1E9PSIsIm1hYyI6ImJmZGIzMjAzNTI3ZjYwZTFhNzZiMDk3NGU4NzRlZmFjNWJkOTQ2MmZhZWM1NGQyZjkzM2ViYWUwNjc4YTllYzYifQ%3D%3D; TJ8rJCCjFZq9mxH2Axoj7doipqXl5vPLQzFakJ3t=eyJpdiI6ImgwbVl0VGdqT3ZDU3B5RkpxeThJYUE9PSIsInZhbHVlIjoieEJtOHZOTm1PcFAxQ0tMdjBYVGk0aTFGTkdZVk83cm00MnFpc1FFa29GUHdmZ3BJQitnZjlPamlzT1BrcTU3TVQxZTRJYmdyRTJ1SHlcL1FEclc4UlFXUUwwalB2d0VpdDdlZzlpZWo1M1o0ZkZ6WmJHeUNlM3JoWStqeFZGVmJybkxKNUVBa1B4dnkxSURDOFFuQTVpc3djM2NIdkY2WGhpZ3llOWp4ZHpPK0NUeWcweVFBeG1nMG5cL0pZNzBMZTVPZ253b1ZKVlVOcVhiUEdpNEVcL3hVK2FPY2k5ZHBKXC83U09LRjEyT29JZHM4K21JNEtTcE02Rzh2eWc4YTkyTkJ0RjJaQit4QXVHa2Y1eXRHZkhqNVRBPT0iLCJtYWMiOiI0NTYzMjdlZjM2ZTU3YjRiZmJlMGJhZmI0Nzg1M2VmMDA4ODUwZjQyZTE2OTg5OWNlNWY3MTBjZmMzM2JhNDVmIn0%3D; ",
                "Connection": "keep-alive",
            },
        };
        this.accounts = [];
    }

    getAllInfo() {
        return this.api.get("https://api.librus.pl/2.0/Me", this.requestConfig);
    }

    async fetchAccounts() {
        const response = await this.api.get("https://portal.librus.pl/api/SynergiaAccounts", this.requestConfig);
        this.requestConfig.headers["Cookie"] = response.headers["set-cookie"].join("; ");

        this.accounts = response.data.accounts.map(x => new Account(x));
        this.currentAccount = this.accounts[0];
        this.requestConfig.headers["Authorization"] = "Bearer " + this.currentAccount.accessToken;
    }


    async login(email, password) {
        const response = await this.api.post("https://portal.librus.pl/rodzina/login/action", { email, password }, this.requestConfig);
        this.requestConfig.headers["Cookie"] = response.headers["set-cookie"].join("; ");

        await this.fetchAccounts();
    }

    async getGrades() {
        const response = await this.api.get("https://api.librus.pl/2.0/Grades", this.requestConfig);
        if(response.headers["set-cookie"]) this.requestConfig.headers["Cookie"] = response.headers["set-cookie"].join("; ");

        return response.data["Grades"].map(x => new Grade(x));
    }

};

