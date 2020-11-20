FROM golang
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN go build -o check-stats .
CMD ["/app/check-stats"]