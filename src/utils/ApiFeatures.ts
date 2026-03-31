class ApiFeatures {
    query: any;
    queryString: any;
    
    constructor(query: any, queryString: any) {
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = (this.queryString.sort as string).split(",").join(" ");
            this.query.sort(sortBy)
        } else {
                this.query = this.query.sort("-createdAt");
        }
        return this
    }
    limit() {
        if (this.queryString.fields) {
            let fields = this.queryString.fields as string;
            const cleanFields = fields.split(",").join(" ");
            this.query.select(cleanFields);
        } else {
            this.query = this.query.select("-__v");
        }
        return this;
    }
    pagination() {
        const page = Number(this.queryString.page) || 1;
        let limit = Number(this.queryString.limit) || 10;
        if (limit > 20) {
            limit = 20;
        }
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

export default ApiFeatures;