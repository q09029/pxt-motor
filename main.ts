enum MOTOR_DIR {
    //% block=FRONT
    FRONT = 0,
    //% block=REVERCE
    REVERCE,
}
enum MOTOR_CH {
    //% block=MOTOR1
    MOTOR1 = 0,
    //% block=MOTOR2
    MOTOR2,
}

enum MOTORS {
    //% block=RIGHTMOTOR
    RIGHTMOTOR = 0,
    //% block=LEFTMOTOR
    LEFTMOTOR,
}

let motor = [MOTOR_CH.MOTOR1, MOTOR_CH.MOTOR2]
let motor_dir = [MOTOR_DIR.FRONT, MOTOR_DIR.FRONT]
/**
 * Blocks
 */
"//% weight=100 color=#0000ff icon="
namespace MOTOR {
    //% block="モーターを回す %motorno %dir 速度 %speed_6it"
    //% speed_6it.min=0 speed_6it.max= 63 x.defl=32
    export function driveMotor(motorno: MOTORS, dir: MOTOR_DIR, speed_6it: number) {
        let speed = 0
        let data = 0
        //motor2の時はビットを立てる
        if (motor[motorno] == MOTOR_CH.MOTOR2) {
            data |= 0x80;
        }
        //正転指示かつモーター設定が正転の時と、逆転指示かつモーター設定が逆転の時にビットを立てる
        if ((motor_dir[motorno] == dir)) {
            data |= 0x40;
        }
        if (speed_6it > 63) {
            speed = 63
        } else {
            speed = speed_6it
        }
        data |= speed;
        pins.i2cWriteNumber(
            16,
            data,
            NumberFormat.UInt8LE,
            false
        )
    }
}
