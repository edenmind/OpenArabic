namespace api.Helpers {
    public static class ReadTime {
        public static string GetReadTime (int numberOfChars) {

            var result = "";

            switch (numberOfChars) {
            case <100:
                result = "1 min read";
                break;
            case >100 and < 300:
                result = "2 min read";
                break;
            case >300 and < 500:
                result = "3 min read";
                break;
            case >500 and < 700:
                result = "3 min read";
                break;
            }

            return result;
        }
    }
}
