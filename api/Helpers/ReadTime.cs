namespace api.Helpers {
    public static class ReadTime {
        public static string GetReadTime (int numberOfChars) {

            string result = numberOfChars
            switch { <
                100 => "1 min read", >
                100 and < 300 => "2 min read", >
                300 and < 500 => "3 min read", >
                500 => "4 min read",
                _ => "Unknown time",
            };

            return result;
        }
    }
}
