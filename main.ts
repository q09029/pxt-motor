enum MOTOR_DIR {
    //% block=正転
    FRONT = 0,
    //% block=逆転
    REVERCE,
}
enum MOTOR_CH {
    //% block=モーター１
    MOTOR1 = 0,
    //% block=モーター２
    MOTOR2,
}

enum MOTORS {
    //% block=右モーター
    RIGHTMOTOR = 0,
    //% block=左モーター
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
    //%speed_6it.min=0 speed_6it.max=63
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

    //% block="モーター番号を設定する %motorno モーター番号 %motorch"
    export function setMotorNo(motorno: MOTORS, motorch: MOTOR_CH) {
        motor[motorno] = motorch
    }

    //% block="モーターの方向設定する %motorno %motorch"
    export function setMotorDir(motorno: MOTORS, dir: MOTOR_DIR) {
        motor_dir[motorno] = dir
    }
}
 